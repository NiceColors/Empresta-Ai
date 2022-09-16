import { Box, Button, Image, useBreakpointValue, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { api } from '../../../services/apiClient'
import { BookContainer } from '../../atoms/Containers/BookContainer'

interface IProps {
    src?: string
    status?: boolean
    hash?: string
}

export const BookAction: FC<IProps> = ({ src, status, hash }) => {

    const router = useRouter()
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const screen = useBreakpointValue({
        base: false,
        lg: true,
    })

    const handleLoanSubmit = async (values: any) => {
        setLoading(true)
        try {
            const { data: response } = await api.put(`/loans`, {
                loanId: hash,
                status: true,
            })
            const createMessage = response?.message ?? 'Livro devolvido'
            toast({
                title: `Livro devolvido`,
                description: createMessage,
                status: 'success',
                isClosable: true,
                duration: 5000,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: `Error ao devolver o livro`,
                status: 'error',
                isClosable: true,
                duration: 5000,
            })
        } finally {
            setLoading(false)
            router.push('?reload=true')
        }
    }

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
                    <Button
                        isLoading={loading}
                        onClick={() => {
                            router.push('/emprestimos')
                        }}
                        size={['sm', 'sm', 'sm', 'md']} w={'100%'}
                        colorScheme={'yellow'}>
                        {screen ? "Realizar empréstimo" : 'Emprestar'}
                    </Button>
                    :
                    <Button onClick={handleLoanSubmit} colorScheme={'green'} 
                    size={['sm', 'sm', 'sm', 'md']} w={'100%'}>{screen ? "Registrar devolução" : "Devolver"}</Button>
                }
            </Box>
        </BookContainer>
    )
}


