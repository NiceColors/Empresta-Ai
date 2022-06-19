import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <div key={'styles'}>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </div>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
