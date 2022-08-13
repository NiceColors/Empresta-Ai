

type ValidateUserPermissionsParams = {
    user: User;
    permissions?: string[];
    role?: string[];
}

export function ValidateUserPermissions({
    user,
    permissions,
    role
}: ValidateUserPermissionsParams) {


    console.log('Function1', user.permissions, permissions)
    console.log('Function2', user.role, role)

    if (permissions && permissions?.length > 0) {


        const hasAllPermissions = permissions?.every(permission => {
            return user?.permissions?.includes(permission)
        })

        console.log(hasAllPermissions)

        if (!hasAllPermissions) return false

    }


    if (role && role?.length > 0) {

        const hasAllrole = role?.some(permission => {
            return user?.role?.includes(permission)
        })

        console.log(hasAllrole)


        if (!hasAllrole) return false

    }

    return true

}