
import { Box, Text, theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react'
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});


export const Charts = () => {

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


    return (
        <>
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
        </>
    )
}
