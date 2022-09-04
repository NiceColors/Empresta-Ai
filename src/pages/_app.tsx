import { ChakraProvider, Spinner } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { parseCookies } from 'nookies'
import React, { useContext, Suspense, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import Layout from '../layout'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps, router }: AppProps) {
  const Spinner = <HashLoader color={'#77dd77'} style={{ position: 'absolute', top: '50%', right: '50%' }} />
  const getLayout = Layout ?? (page => page)
  const [token, setToken] = useState(false)
  const { 'nextauth.token': appToken, } = parseCookies();

  useEffect(() => {
    setToken(!!appToken)
  }, [appToken])


  const isLoginPage = router.asPath === '/login'
  const isAuth = (token || !isLoginPage) ? getLayout(<Component  {...pageProps} />) : <Component  {...pageProps} />

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Suspense fallback={Spinner}>
          {isAuth}
        </Suspense>
      </AuthProvider>
    </ChakraProvider>

  )
}

export default MyApp
