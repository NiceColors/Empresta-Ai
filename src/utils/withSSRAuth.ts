import decode from 'jwt-decode'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { ValidateUserPermissions } from './validateUserPermissions'
import { AuthTokenError } from "../services/Errors/AuthTokenError"

type WithSSRAuthOptions = {
    permissions?: string[];
    role?: string[];
}


export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => { //High Order Function 
        const cookies = parseCookies(ctx)

        const token = cookies["nextauth.token"]

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }


        if (options) {
            const user = decode<{ permissions: string[], role: string[] }>(token)

            const { permissions, role } = options

            const userHasValidPermissions = ValidateUserPermissions({
                user,
                permissions,
                role
            })


            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                    }
                }
            }

        }



        try {
            return await fn(ctx)

        } catch (err) {

            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, 'nextauth.token', { path: '/' })
                destroyCookie(ctx, 'nextauth.refreshToken', { path: '/' })

                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }

            }

            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }


        }

    }
}