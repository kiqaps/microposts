import React, { createContext, useState } from 'react'
import { Spinner } from '../Views/Components/Spinner'

export interface IGlobalContext {
  showLoader: () => void
  hideLoader: () => void
}

export const GlobalContext = createContext<IGlobalContext | null>(null)

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [loaderCount, setLoaderCount] = useState(0)

  const showLoader = () => {
    setLoaderCount(old => old + 1)
  }

  const hideLoader = () => {
    setLoaderCount(old => (old > 0 ? old - 1 : 0))
  }

  return (
    <GlobalContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loaderCount > 0 && <Spinner />}
    </GlobalContext.Provider>
  )
}
