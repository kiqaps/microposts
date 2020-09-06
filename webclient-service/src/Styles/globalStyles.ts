import { createGlobalStyle } from 'styled-components'
import { StyleVariables } from './variables'

export const GlobalStyle = createGlobalStyle`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    background-color: ${StyleVariables.Colors[1]};
  }

  body {
    font-family: 'Lato', sans-serif;
    font-size: 1.6rem;
  }

  ol,
  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1.6rem;
    font-weight: 400;
  }
`
