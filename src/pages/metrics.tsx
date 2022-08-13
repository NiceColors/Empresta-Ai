import { Badge, Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { destroyCookie } from 'nookies';
import React, { useContext, useEffect } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Can } from '../components/Can';
import { AuthContext } from '../contexts/AuthContext';
import { useCan } from '../hooks/useCan';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { AuthTokenError } from '../services/Errors/AuthTokenError';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Metrics() {

    return (
        <>
            <h2>Salve</h2>
        </>

    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {


    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('users/me')


    return {
        props: {}
    }
}, {
    permissions: ['USER'],
    role: ['MANAGER']
})