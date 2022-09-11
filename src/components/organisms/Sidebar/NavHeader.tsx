import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';


interface NavHeaderProps {
    mobile: boolean;
}



export default function NavHeader({ mobile }: NavHeaderProps) {


    const [emote, setEmote] = useState('😎')
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const roles = {
        'MANAGER': 'ADMINISTRADOR',
        'INTERN': 'ESTAGIÁRIO'
    }

    useEffect(() => {
        const emotes = ['💶', '😎', '😞', '🪄', '⌨️', '🥸', '💕', '😋', '🤓', '🏳️‍🌈']
        const random = Math.floor(Math.random() * emotes.length - 1)
        setEmote(emotes.filter(item => item != emote)[random])

        return () => {
            setEmote('😎')
        }

    }, [router.pathname])

    return (
        <>
            <Avatar size='md' name='avatar' src='https://avatars.githubusercontent.com/u/54453426?v=4' />
            {!mobile &&
                <Box>
                    <Text fontSize={'12px'} color="#ffffff53">{user.role && (roles[user.role] ?? "Lorem Ipsum")}</Text>
                    <Heading color="#DADADA" fontSize={'1rem'} fontWeight={400} whiteSpace={'nowrap'}>{user.name} {emote}</Heading>
                </Box>
            }

        </>
    )
}
