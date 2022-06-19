import 'antd/dist/antd.variable.min.css'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from '../layout'
import { GlobalStyles } from '../styles/globalStyles'

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Layout ?? (page => page)

  return (
    <>
      <GlobalStyles />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
