


import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    Link as ChakraLink,
    useColorMode,
    Spinner,
    Img,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import MotionBox from "../components/atoms/Motion/Motion";
import { useCan } from "../hooks/useCan";

interface CanProps {
    children: ReactNode
    permissions?: string[]
    role?: 'MANAGER' | 'INTERN'
}

export function Can({ children, permissions, role }: CanProps) {

    const userCanSeeComponent = useCan({ permissions, role })
    const router = useRouter()

    if (!userCanSeeComponent)
        return (
            <Page403 />
        )

    return (
        <>
            {children}
        </>
    )
}



const Page403 = () => {

    return (
        <>

            <MotionBox
                animate={{ y: 20 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                width={["80%", "50%", "20%", "30%"]}
                margin="0 auto"
                overflow={'hidden'}
            >
                <Img src="/403.svg" alt="Error 403 Forbidden Illustration" />
            </MotionBox>

            <Box marginY={4}>
                <Heading textAlign="center" fontSize={'xl'} color={'red.500'}>FORBIDDEN 😨</Heading>

                <Box textAlign="center" marginTop={4}>
                    <Text color={'white'} mb={3}>Você não tem autorização para acessar essa página</Text>
                    <Link href="/dashboard" passHref>
                        <Button
                            backgroundColor={'white'}
                            color={'gray.700'}
                        >
                            Sair daqui!
                        </Button>
                    </Link>
                </Box>
            </Box>

        </>
    );
};
