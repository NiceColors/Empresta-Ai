import { Badge, Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default function Dashboard() {
    return (
        <>
            <Grid templateColumns={'1.5fr 1fr'} gap={24}>
                <GridItem>
                    <Flex gap={4}>
                        <Box borderRadius={12} w="100%" h={"30vh"} bgColor="green.200">

                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={24} mb={6}>
                        <Heading fontWeight={500} color="gray.500">
                            Livros
                        </Heading>
                        <Link href="/dashboard">
                            <Text mt={3} fontWeight={600} color="gray.500" cursor="pointer">Ver todos {'>'} </Text>
                        </Link>
                    </Flex>
                    <SimpleBar style={{ maxHeight: '79vh' }}>
                        <Grid templateColumns="1fr 1fr 1fr" gap={12} mt={8} py={0} paddingRight={6}>
                            {Array.from(Array(12), (_, x) => x).map((item, index) =>
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
                                        bgImage={'url(https://images-na.ssl-images-amazon.com/images/I/418Dq8vTZ1L.jpg)'}
                                        bgSize="cover"
                                        position={'relative'}
                                    >
                                        <Badge
                                            colorScheme="green"
                                            variant="solid"
                                            position="absolute"
                                            bottom={2}
                                        >Disponível</Badge>
                                    </Box>
                                    <Heading fontWeight={500} fontSize="lg" mt={2}>{"OLHOS D'ÁGUA"} - 2015</Heading>
                                    <Text>Conceição Evaristo</Text>
                                </GridItem>

                            )}
                        </Grid>
                    </SimpleBar>

                </GridItem>

                <GridItem>

                    <Box borderRadius={12} w="100%" h={"30vh"} bgColor="green.200">

                    </Box>
                    <Heading fontWeight={500} color="gray.500" mt={24}>
                        Atividades recentes
                    </Heading>
                    <SimpleBar style={{ maxHeight: '79vh' }}>
                        <Flex mt={8} flexDirection="column" gap={8} paddingRight={4}>
                            {Array.from(Array(120), (_, x) => x).map((item, index) =>
                                <Flex key={index} align="center" justifyContent={'space-between'}>
                                    <Flex gap={4}>
                                        <Box w={"45px"} h={"45px"} borderRadius="100%" bgColor="gray.300" border="1px solid #ccc" />
                                        <Box>
                                            <Text fontWeight={700} color="gray.600">Luis Felipe Amorim {index + 1}°</Text>
                                            <Text>Fez um empréstimo de um novo livro</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize={'0.875rem'} fontWeight={600} color="gray.500"> Há 2 dias</Text>
                                </Flex>
                            )}
                        </Flex>
                    </SimpleBar>

                </GridItem>
            </Grid>

        </>
    )
}
