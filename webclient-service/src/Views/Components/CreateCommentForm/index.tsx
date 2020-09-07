import React from 'react'
import { CreateCommentFormContainer } from './style'
import { BiCommentAdd } from 'react-icons/bi'

export const CreateCommentForm: React.FC = () => {
  return (
    <CreateCommentFormContainer>
      <div>
        <input type="text" placeholder="new comment..." />
        <button type="submit">
          <BiCommentAdd />
        </button>
      </div>
    </CreateCommentFormContainer>
  )
}
