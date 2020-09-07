import styled from 'styled-components'
import { StyleVariables } from '../../../Styles/variables'
import { lighten } from 'polished'

export const CreateCommentFormContainer = styled.form`
  margin-top: 1rem;

  div {
    display: flex;
    width: 100%;

    input {
      border: none;
      border-bottom: 1px solid ${lighten(0.2, StyleVariables.Colors[3])};
      background-color: transparent;
      margin-right: 0.5rem;
      flex: 1;
      color: ${StyleVariables.Colors[3]};

      &::placeholder {
        color: ${StyleVariables.Colors[3]};
      }
    }

    button {
      display: flex;
      border: none;
      border-radius: 3px;
      background-color: ${StyleVariables.Colors[0]};
      color: ${StyleVariables.Color.White};
      padding: 0.5rem 1rem;
      font-size: 2rem;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
      }
    }
  }
`
