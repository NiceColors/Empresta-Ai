import { Avatar, Badge, Box, Flex, Grid, GridItem, Heading, Show, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ApexOptions } from 'apexcharts';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useDebounce } from '../hooks/useDebounce';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';
// eslint-disable-next-line react/prop-types

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-03-18T00:00:00.000z',
            '2021-03-19T00:00:00.000z',
            '2021-03-20T00:00:00.000z',
            '2021-03-21T00:00:00.000z',
            '2021-03-22T00:00:00.000z',
            '2021-03-23T00:00:00.000z',
            '2021-03-24T00:00:00.000z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
}

const series = [
    {
        name: '2021',
        data: [31, 120, 10, 228, 61, 18, 109]
    },
    {
        name: '2022',
        data: [11, 220, 30, 140, 10, 60, 70]
    },


]

export default function Dashboard() {

    const [data, setData] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            const response = await api.get(`/books?limit=10`);
            setData(response.data.books)
            console.log(response.data);
        })();
    }, [])

    return (
        <>

            <SimpleGrid flex='1' gap='4' minChildWidth={420}>
                <Box
                    p={['6', '8']}
                    bg='gray.800'
                    borderRadius='8'
                    pb='4'
                >
                    <Text fontSize='lg' mb='4' color={'gray.50'}>Empréstimos da semana</Text>

                    <Chart
                        options={options}
                        series={series}
                        type='area'
                        height={220}
                    />
                </Box>
                <Box
                    p={['6', '8']}
                    bg='gray.800'
                    borderRadius='8'
                    pb='4'
                >
                    <Text fontSize='lg' mb='4' color={'gray.50'}>Devoluções</Text>

                    <Chart
                        options={options}
                        series={series}
                        type='scatter'
                        height={220}
                    />
                </Box>
            </SimpleGrid>

            <Grid templateColumns={{ base: 'repeat(1fr)', lg: '1.5fr 1fr' }} gap={24}>

                <GridItem>
                    <Flex gap={4}>

                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} mt={24} mb={6}>
                        <Heading fontWeight={400} color="whiteAlpha.900">
                            Últimos lançamentos
                        </Heading>
                        <Link href="/dashboard">
                            <Flex alignItems={'center'}>
                                <Text fontWeight={400} color="whiteAlpha.900" cursor="pointer">Ver todos</Text>
                                <ChevronRightIcon color={'#fff'} />
                            </Flex>
                        </Link>
                    </Flex>
                    <Grid
                        maxH={'84vh'} overflowY={'auto'}
                        gap={12} mt={8}
                        py={4}
                        paddingRight={6}
                        templateColumns={'repeat(auto-fit, minmax(240px, 1fr))'}
                    >
                        {data?.map((item: any, index: any) =>
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
                                    bgColor="gray.50"
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