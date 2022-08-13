import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'


interface NavHeaderProps {
    mobile: boolean;
}

export default function NavHeader({ mobile }: NavHeaderProps) {
    return (
        <>
            <Avatar size='md' name='Dan Abrahmov' src='https://avatars.githubusercontent.com/u/35050003?v=4' />
            {!mobile &&
                <Box>
                    <Text fontSize={'12px'} color="#ffffff53">ADMINISTRADOR</Text>
                    <Heading color="#DADADA" fontSize={'lg'} fontWeight={400}>Felpo 😎</Heading>
                </Box>
            }

        </>
    )
}
