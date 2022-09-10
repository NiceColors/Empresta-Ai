import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ValidateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
    permissions?: string[];
    role?: 'MANAGER' | 'INTERN';
}

export function useCan({ permissions, role }: UseCanParams) {
    const { user, isAuthenticated } = useContext(AuthContext)


    if (!isAuthenticated) return false


    const userHasValidPermissions = ValidateUserPermissions({
        user,
        permissions,
        role
    })

    return userHasValidPermissions

}