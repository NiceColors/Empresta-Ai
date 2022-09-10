import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';


interface NavHeaderProps {
    mobile: boolean;
}

export default function NavHeader({ mobile }: NavHeaderProps) {

    const { user } = useContext(AuthContext)

    const roles = {
        'MANAGER': 'ADMINISTRADOR',
        'INTERN': 'ESTAGIÁRIO'
    }

    //get random emotes
    const emotes = () => {
        const emotes = ['💶', '😎', '😞', '🪄', '⌨️', '🥸', '💕', '😋', '🤓', '🏳️‍🌈']
        const random = Math.floor(Math.random() * emotes.length)
        return emotes[random]
    }

    return (
        <>
            <Avatar size='md' name='avatar' src='https://avatars.githubusercontent.com/u/54453426?v=4' />
            {!mobile &&
                <Box>
                    <Text fontSize={'12px'} color="#ffffff53">{user.role && roles[user.role]}</Text>
                    <Heading color="#DADADA" fontSize={'1rem'} fontWeight={400} whiteSpace={'nowrap'}>{user.name} {emotes()}</Heading>
                </Box>
            }

        </>
    )
}
