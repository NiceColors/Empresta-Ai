import { ChakraProvider, Spinner } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { AuthProvider } from '../contexts/AuthContext'
import Layout from '../layout'
import { GlobalStyles } from '../styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {

  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const Spinner = <HashLoader color={'#77dd77'} style={{ position: 'absolute', top: '50%', right: '50%' }} />


  const getLayout = Layout ?? (page => page)

  return (
    <ChakraProvider>
      <GlobalStyles />
      <AuthProvider>
        <Component  {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
