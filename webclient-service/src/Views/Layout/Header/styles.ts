import styled from 'styled-components'
import { StyleVariables } from '../../../Styles/variables'

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${StyleVariables.Colors[2]};
  color: ${StyleVariables.Color.White};
  height: 8rem;

  @media ${StyleVariables.Breakpoints.md} {
    justify-content: start;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 300;

    @media ${StyleVariables.Breakpoints.md} {
      margin-left: 4rem;
    }

    strong {
      color: ${StyleVariables.Colors[0]};
      font-weight: inherit;
    }
  }
`
