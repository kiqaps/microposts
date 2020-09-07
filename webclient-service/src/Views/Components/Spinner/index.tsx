import React from 'react'

import { SpinnerContainer } from './style'

export const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <div className="loader"></div>
    </SpinnerContainer>
  )
}
