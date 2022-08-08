import { Box, Button, Flex, Grid, GridItem, Heading, Image, Link, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { useState } from 'react'

const Home: NextPage = () => {

    return (
        <>
            salve
        </>
    )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const isAuth = false

    if (!isAuth) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }

    return {
        props: {}
    }
}