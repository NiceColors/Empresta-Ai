import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import { Layout } from '../layout'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps, router }: AppProps) {

  const isLoginPage = router.asPath === '/login'

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {isLoginPage ? <Component  {...pageProps} /> : (
          <Layout>
            <Component  {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </ChakraProvider>

  )
}

export default MyApp
