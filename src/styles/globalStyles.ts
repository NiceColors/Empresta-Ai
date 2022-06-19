import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

  html,

  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  ul {
    list-style-type: none;
  }


  footer{
    text-align: left;
  }

  header{
    display: flex;
    justify-content: space-between;
  }

`
