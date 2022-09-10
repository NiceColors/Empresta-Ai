import Router, { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react';
import { api } from '../services/apiClient';

type User = {
    email?: string;
    permissions?: string[];
    role?: 'MANAGER' | 'INTERN';
    name: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    user: User
    isAuthenticated: boolean;
}


type AuthProviderProps = {
    children?: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);


let authChannel: BroadcastChannel


export function signOut(broadcast?: boolean) {
    destroyCookie(undefined, 'nextauth.token', { path: '/' })
    destroyCookie(undefined, 'nextauth.refreshToken', { path: '/' })

    if (broadcast) authChannel.postMessage('signOut');

    Router.push('/login')
}

export function AuthProvider({ children }: AuthProviderProps) {
    let router = useRouter()

    const [user, setUser] = useState<User>({} as User);
    const isAuthenticated = !!user.email;

    useEffect(() => {
        const { 'nextauth.token': token, } = parseCookies();

        if (token) {
            api.get('/users/me').then(res => {
                const { email, permissions, name, role } = res.data
                console.log(res.data)
                setUser({ email, permissions, name, role })
            }).catch(() => {
                signOut()
            })
        }


    }, [])

    useEffect(() => {

        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut(false);
                    break;

                default: break;
            }
        }
    }, [])



    async function signIn({ email, password }: SignInCredentials) {

        const res = await api.post('/sessions', {
            email,
            password
        })

        const { token, refreshToken } = res.data
        const { permissions, role, name } = res.data.user

        setCookie(undefined, 'nextauth.token', token)
        setCookie(undefined, 'nextauth.refreshToken', refreshToken)

        setUser({
            email,
            permissions,
            role,
            name
        })

        //tipar api
        api.interceptors.request.use(function (config) {
            config!.headers!.Authorization = `Bearer ${token}`
            return config;
        });

        router.push('/dashboard')

    }

    return <AuthContext.Provider value={{ signOut, signIn, isAuthenticated, user }}>{children} </AuthContext.Provider>
};

