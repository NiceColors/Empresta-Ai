
import { Box, Skeleton, Text, theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react'
import { api } from '../../../services/apiClient';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});


interface ChartProps {
    options?: ApexOptions
    series?: any
    type?: string
    height?: number
    loading?: boolean
}

export const Charts = ({ loading = false, ...props }: ChartProps) => {

    const [loans, setLoans] = React.useState<any>([])
    const getData = async () => {
        const { data: response } = await api.get('/loans?limit=50')
        setLoans(response.data)
    }

    React.useEffect(() => {
        getData()
    }, [])

    const dates = loans.map((item: { startDate: string }) => new Date(item.startDate).toDateString())


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
            categories: dates
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
            data: [0, 2, 1, 1, 1]
        },
        {
            name: '2022',
            data: dates.map((item: any) => {

                console.log(loans.filter((loan: any) => new Date(loan.startDate).toDateString() === item)?.length)

                return loans.filter((loan: any) => new Date(loan.startDate).toDateString() === item)?.length
            })
        },
    ]


    return (
        <>
            <Box
                p={['6', '8']}
                bg='gray.800'
                borderRadius='8'
                pb='4'
            >
                <Text fontSize='lg' mb='4' color={'gray.50'}>Empréstimos da semana</Text>

                <Skeleton w={'100%'} isLoaded={!loading}>
                    <Chart
                        options={options}
                        series={series}
                        type='area'
                        height={220}
                    />
                </Skeleton>
            </Box>
            <Box
                p={['6', '8']}
                bg='gray.800'
                borderRadius='8'
                pb='4'
            >
                <Text fontSize='lg' mb='4' color={'gray.50'}>Devoluções</Text>

                <Skeleton w={'100%'} isLoaded={!loading}>
                    <Chart
                        options={options}
                        series={series}
                        type='scatter'
                        height={220}
                    />
                </Skeleton>
            </Box>
        </>
    )
}
