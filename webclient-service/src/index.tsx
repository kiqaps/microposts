import React from 'react'
import ReactDOM from 'react-dom'

import { GlobalStyle } from './Styles/globalStyles'
import { App } from './App'

ReactDOM.render(
  <>
    <App />
    <GlobalStyle />
  </>,
  document.getElementById('root'),
)
