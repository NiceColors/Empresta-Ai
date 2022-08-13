import React, { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface CanProps {
    children: ReactNode
    permissions?: string[]
    role?: string[]
}

export function Can({ children, permissions, role }: CanProps) {



    const userCanSeeComponent = useCan({ permissions, role })

    if (!userCanSeeComponent) return null

    return (
        <>
            {children}
        </>
    )
}

