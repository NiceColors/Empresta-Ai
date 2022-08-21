

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

    if (permissions && permissions?.length > 0) {


        const hasAllPermissions = permissions?.every(permission => {
            return user?.permissions?.includes(permission)
        })

        if (!hasAllPermissions) return false

    }


    if (role && role?.length > 0) {

        const hasAllrole = role?.some(permission => {
            return user?.role?.includes(permission)
        })

        if (!hasAllrole) return false

    }

    return true

}