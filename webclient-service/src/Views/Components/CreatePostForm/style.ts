import styled from 'styled-components'
import { StyleVariables } from '../../../Styles/variables'

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 3rem 0;

  @media ${StyleVariables.Breakpoints.md} {
    flex-direction: row;
  }

  input {
    @media ${StyleVariables.Breakpoints.md} {
      flex: 1;
    }
  }

  button {
    margin-top: 0.5rem;
    padding: 1rem 2rem;
    text-transform: uppercase;
    border: none;
    background-color: ${StyleVariables.Colors[0]};
    color: ${StyleVariables.Color.White};
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;

    @media ${StyleVariables.Breakpoints.md} {
      margin-top: 0;
      margin-left: 0.5rem;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
    }
  }
`
