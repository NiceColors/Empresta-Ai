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


  .link-active{
    transition: 0.3s all ease-in-out;
  }

  .link-active::before{
    content: "";
    position: absolute;
    left: 1px;
    width: 6px;
    top: -65%;
    height: 55px;
    border-radius: 0px 14px 14px 0px;
    background-color: #77dd77;
  }


`
