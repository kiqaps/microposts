import React from 'react'
import ReactDOM from 'react-dom'

import { GlobalStyle } from './Styles/globalStyles'
import { App } from './App'
import { GlobalContextProvider } from './Contexts/Global'

ReactDOM.render(
  <GlobalContextProvider>
    <App />
    <GlobalStyle />
  </GlobalContextProvider>,
  document.getElementById('root'),
)
