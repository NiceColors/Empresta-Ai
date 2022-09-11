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
    const [data, setData] = useState(skeletonArray)
    const isLoading = !(data[0].isbn)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        try {
            (async () => {
                const response = await api.get(`/books?limit=50`);
                setData(response.data.data)
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

            <Grid templateColumns={{ base: 'repeat(1fr)', lg: '1.5fr 1fr' }} gap={24} overflowY={'hidden'}
            >

                <GridItem>
                    <Flex gap={4}>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={24} mb={6}>
                        <Heading fontWeight={400} color="whiteAlpha.900" fontSize={'clamp(1rem, 2.5vw, 2.5rem)'}>
                            Mais populares
                        </Heading>
                        <Link href="/dashboard">
                            <Flex alignItems={'center'}>
                                <Text fontWeight={400} color="whiteAlpha.900" display={{ base: 'none', lg: 'block' }} cursor="pointer">
                                    Ver todos
                                </Text>
                                <ChevronRightIcon color={'#fff'} />
                            </Flex>
                        </Link>
                    </Flex>
                    <Grid
                        maxH={'84vh'} overflowY={'auto'}
                        gap={12} mt={8}
                        py={4}
                        paddingRight={6}
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(3, 1fr)',
                            xl: 'repeat(3, 1fr)',
                        }}
                    >
                        {listOfBooks?.map((item: any, index: any) =>
                            <GridItem position="relative" key={index} mb={12}
                            >

                                <Skeleton w={'100%'} h={'30vh'} borderRadius={'9px'} isLoaded={!isLoading}>

                                    <Box
                                        w={'20px'}
                                        h={'20px'}
                                        bgColor="red.500"
                                        borderRadius={'100%'}
                                        position="absolute"
                                        display={'flex'}
                                        justifyContent="center"
                                        alignItems="center"
                                        color="#fff"
                                        fontSize={'0.8rem'}
                                        right={-2}
                                        top={-2}
                                        zIndex={9999}

                                    >
                                        {item.status ? booksCount(item.isbn) : 0}
                                    </Box>
                                    <Box
                                        w={'100%'}
                                        h={'30vh'}
                                        borderRadius={12}
                                        bgColor="gray.50"
                                        bgImage={`url(${item.bannerUrl})`}
                                        bgSize="contain"
                                        bgRepeat="no-repeat"
                                        bgPosition="center"
                                        position={'relative'}
                                    >
                                        <Badge
                                            colorScheme={item.status ? "green" : "red"}
                                            variant="solid"
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                        >{item.status ? "Disponível" : "Indisponível"}</Badge>
                                    </Box>
                                    <Heading fontWeight={500} color="whiteAlpha.900" fontSize="sm" mt={2}>{item.title}</Heading>
                                    <Text fontWeight={300} color="whiteAlpha.900">{item.author.split(',')[0]}</Text>
                                </Skeleton>

                            </GridItem>

                        )}
                    </Grid>

                </GridItem>
                <GridItem display={{ base: 'none', lg: 'block' }}>
                    <Heading fontWeight={400} color="whiteAlpha.900" mt={24}>
                        Atividades recentes
                    </Heading>
                    <Flex
                        mt={8}
                        flexDirection="column"
                        gap={8} paddingRight={4}
                        maxH={'80vh'}
                        overflowY={'auto'}
                    >
                        {Array.from(Array(120), (_, x) => x).map((item, index) =>
                            <Flex key={index} align="center" justifyContent={'space-between'}>
                                <Flex gap={4}>
                                    <Avatar />
                                    <Box>
                                        <Text fontWeight={400} color="whiteAlpha.900">Luis Felipe Amorim {index + 1}°</Text>
                                        <Text>Fez um empréstimo</Text>
                                    </Box>
                                </Flex>
                                <Text fontSize={'0.875rem'} fontWeight={500} color="gray.400"> Há 2 dias</Text>
                            </Flex>
                        )}
                    </Flex>
                </GridItem>

            </Grid >

        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    return {
        props: {

        }
    }

})