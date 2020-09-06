import styled from 'styled-components'
import { StyleVariables } from '../../../Styles/variables'

import { lighten } from 'polished'

export const PostContainer = styled.div`
  background-color: ${StyleVariables.Colors[4]};
  color: ${StyleVariables.Colors[3]};
  padding: 2rem;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 3rem;

  @media ${StyleVariables.Breakpoints.lg} {
    width: calc((100% - 3rem) / 2);

    &:not(:nth-child(2n)) {
      margin-right: 3rem;
    }
  }

  @media ${StyleVariables.Breakpoints.xl} {
    width: calc((100% - 9rem) / 4);

    &:not(:nth-child(4n)) {
      margin-right: 3rem;
    }
  }

  .post {
    &__date {
      font-size: 1rem;
      font-style: italic;
      color: ${lighten(0.2, StyleVariables.Colors[3])};
    }
  }
`
