import { Box, Button, Image, useBreakpointValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { BookContainer } from '../../atoms/Containers/BookContainer'

interface IProps {
    src?: string
    status?: boolean
}

export const BookAction: FC<IProps> = ({ src, status }) => {

    const screen = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <BookContainer
        >
            <Image
                src={src ?? 'https://via.placeholder.com/150'}
                w={'100%'}
                h={'auto'}
                borderRadius={14}
            />
            <Box mb={4}>
                {!!status ?
                    <Button colorScheme={'yellow'}>{screen ? "Relizar empréstimo" : 'Emprestar'}</Button>
                    :
                    <Button colorScheme={'green'} size={['sm', 'sm', 'sm', 'md']} w={'100%'}>{screen ? "Registrar devolução" : "Devolver"}</Button>
                }
            </Box>
        </BookContainer>
    )
}


