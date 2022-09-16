import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'

class Document extends NextDocument {
  static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='pt-br'>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          {/* modo dark */}
          <meta name="theme-color" content="#1A202C" />
          <meta name="msapplication-navbutton-color" content="#1A202C" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#1A202C" />
          {/* modo light */}
          <meta name="theme-color" content="#F7FAFC" />
          <meta name="msapplication-navbutton-color" content="#F7FAFC" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#F7FAFC" />


        </Head>
        <body>
          <ColorModeScript initialColorMode='system' />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document