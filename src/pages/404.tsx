
import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    Link as ChakraLink,
    useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import React from 'react'
import MotionBox from "../components/atoms/Motion/Motion";
import { withSSRAuth } from "../utils/withSSRAuth";


const Page404 = () => {
    const { colorMode } = useColorMode();

    return (
        <>

            <MotionBox
                animate={{ y: 20 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                width={["80%", "50%", "20%", "30%"]}
                margin="0 auto"
                overflow={'hidden'}
            >
                <Image src="/404.svg" alt="Error 404 not found Illustration" />
            </MotionBox>

            <Box marginY={4}>
                <Heading textAlign="center" fontSize={'xl'} color={'white'}>Not found 😨</Heading>

                <Box textAlign="center" marginTop={4}>
                    <Text color={'white'} mb={3}>Tudo bem!</Text>
                    <Link href="/" passHref>
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

export default Page404;
