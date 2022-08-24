import { ChakraProvider, Spinner } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import Layout from '../layout'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {

  const Spinner = <HashLoader color={'#77dd77'} style={{ position: 'absolute', top: '50%', right: '50%' }} />

  const getLayout = Layout ?? (page => page)
  const { 'nextauth.token': token, } = parseCookies();


  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {token ? getLayout(<Component  {...pageProps} />) : <Component  {...pageProps} />}
      </AuthProvider>
    </ChakraProvider>

  )
}

export default MyApp
