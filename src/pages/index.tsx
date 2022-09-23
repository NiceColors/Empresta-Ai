import { Avatar, Badge, Box, Flex, Grid, GridItem, Heading, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@radix-ui/react-icons';

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Charts } from '../components/molecules/Charts/Index';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
// eslint-disable-next-line react/prop-types


export default function Dashboard() {
    const skeletonArray = [... new Array(12)].map((item, index) => ({ title: 'Lorem Ipsum', author: 'Paçoca', pages: 0, isbn: index }))
    const [data, setData] = useState<any>(skeletonArray)
    const isLoading = !(data[0].isbn)

    const { user } = useContext(AuthContext)
    const [clients, setClients] = useState<any>([])
    const [loans, setLoans] = useState<any>([])


    useEffect(() => {
        try {
            (async () => {
                const { data: response } = await api.get(`/books`);
                setData(response)
            })();

            (async () => {
                const { data: response } = await api.get(`/clients`);
                setClients(response)
            })();
            (async () => {
                const { data: response } = await api.get(`/loans`);
                setLoans(response)
            })();


        } catch (error) {
            console.log(error);
        }
    }, [])

    const uniqueISBNs = [... new Set(data?.map((book: any) => book.isbn))]
    const listOfBooks = !isLoading ? uniqueISBNs.map(item => data.find((book: any) => book.isbn === item)) : skeletonArray
    const booksCount = (isbn: string) => data.filter((book: any) => book.isbn === isbn).length

    return (
        <>

            <SimpleGrid flex='1' gap='4' minChildWidth={{
                base: '120px',
                sm: 200,
                lg: 420
            }} overflowX={'hidden'}>
                <Charts loading={isLoading} />
            </SimpleGrid>

            <Grid templateColumns={'repeat(24, 1fr)'} gap='4'>
                <GridItem
                    colSpan={{
                        base: 24,
                        lg: 12,
                        xl: 6
                    }}
                >
                    <Box mt='8' bg='gray.800' p='8' borderRadius={8}>
                        <Heading size='lg' fontWeight='normal'>Total de Livros</Heading>
                        <Text fontSize={'4rem'}>{data.length}</Text>
                    </Box>
                </GridItem>
                <GridItem
                    colSpan={{
                        base: 24,
                        lg: 12,
                        xl: 6
                    }}
                >
                    <Box mt='8' bg='gray.800' p='8' borderRadius={8}>
                        <Heading size='lg' fontWeight='normal'>Clientes</Heading>
                        <Text fontSize={'4rem'}>{clients.length}</Text>
                    </Box>
                </GridItem>
                <GridItem
                    colSpan={{
                        base: 24,
                        lg: 12,
                        xl: 12
                    }}
                    mt={6} mx={6}
                >
                    <Heading fontWeight={400} color="whiteAlpha.900">
                        Atividades recentes
                    </Heading>
                    <Flex
                        mt={8}
                        flexDirection="column"
                        gap={8} paddingRight={4}
                        maxH={'40vh'}
                        overflowY={'auto'}
                    >
                        {loans.data.map((item: any, index: number) =>
                            <Flex key={index} align="center" justifyContent={'space-between'}>
                                <Flex gap={4}>
                                    <Avatar />
                                    <Box>
                                        <Text fontWeight={400} color="whiteAlpha.900">{item.clientName}</Text>
                                        <Text>Fez um empréstimo</Text>
                                    </Box>
                                </Flex>
                                <Text fontSize={'0.875rem'} fontWeight={500} color="gray.400">
                                    {
                                        new Date(item.createdAt).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })
                                    }
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </GridItem>
            </Grid>

        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {

        }
    }

})