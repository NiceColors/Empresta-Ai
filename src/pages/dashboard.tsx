import { Badge, Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { AuthContext } from '../contexts/AuthContext';
import { getBooks, useBooks } from '../hooks/useBooks';
import { useDebounce } from '../hooks/useDebounce';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
// eslint-disable-next-line react/prop-types







export default function Dashboard({ books }: any) {
    const { data } = useBooks({
        initialData: books,
    })

    


    

    return (
        <>
            <Grid templateColumns={'1.5fr 1fr'} gap={24}>
                <GridItem>
                    <Flex gap={4}>
                        <Box borderRadius={12} w="100%" h={"30vh"} border="1px solid #ffcfcc">

                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={24} mb={6}>
                        <Heading fontWeight={400} color="whiteAlpha.900">
                            Livros no catalogo
                        </Heading>
                        <Link href="/dashboard">
                            <Flex alignItems={'center'}>
                                <Text fontWeight={400} color="whiteAlpha.900" cursor="pointer">Ver todos</Text>
                                <ChevronRightIcon color={'#fff'} />
                            </Flex>
                        </Link>
                    </Flex>
                    <SimpleBar style={{ maxHeight: '79vh' }}>
                        <Grid templateColumns="1fr 1fr 1fr" gap={12} mt={8} py={0} paddingRight={6}>
                            {data?.map((item, index) =>
                                <GridItem position="relative" key={index}>
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
                                        {index}

                                    </Box>
                                    <Box
                                        borderRadius={12} w="100%" h={"40vh"}
                                        bgColor="green.200"
                                        bgImage={`url(${item.bannerUrl})`}
                                        bgSize="cover"
                                        position={'relative'}
                                    >
                                        <Badge
                                            colorScheme="green"
                                            variant="solid"
                                            position="absolute"
                                            bottom={0}
                                        >Disponível</Badge>
                                    </Box>
                                    <Heading fontWeight={500} color="whiteAlpha.900" fontSize="lg" mt={2}>{item.title} - 2015</Heading>
                                    <Text fontWeight={300} color="whiteAlpha.900">{item.author.split(',')[0]}</Text>
                                </GridItem>

                            )}
                        </Grid>
                    </SimpleBar>

                </GridItem>

                <GridItem>

                    <Box borderRadius={12} w="100%" h={"30vh"} border="1px solid #ffcfcc">

                    </Box>
                    <Heading fontWeight={400} color="whiteAlpha.900" mt={24}>
                        Atividades recentes
                    </Heading>
                    <SimpleBar style={{ maxHeight: '79vh' }} color='white'>
                        <Flex mt={8} flexDirection="column" gap={8} paddingRight={4}>
                            {Array.from(Array(120), (_, x) => x).map((item, index) =>
                                <Flex key={index} align="center" justifyContent={'space-between'}>
                                    <Flex gap={4}>
                                        <Box w={"45px"} h={"45px"} borderRadius="100%" border="1px solid #ccc" />
                                        <Box>
                                            <Text fontWeight={400} color="whiteAlpha.900">Luis Felipe Amorim {index + 1}°</Text>
                                            <Text>Fez um empréstimo de um novo livro</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize={'0.875rem'} fontWeight={500} color="gray.400"> Há 2 dias</Text>
                                </Flex>
                            )}
                        </Flex>
                    </SimpleBar>

                </GridItem>
            </Grid>

        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {


    // const apiClient = setupAPIClient(ctx)
    // const response = await apiClient.get('users/me')

    const apiClient = setupAPIClient(ctx)
    const { data } = await apiClient.get('books')



    return {
        props: {
            books: data.books
        }
    }
})