import React from 'react'
import { IComment } from '../../../Models/IComment'
import { CommentListContainer } from './style'

interface ICommentsListProps {
  comments: IComment[]
}

export const CommentsList: React.FC<ICommentsListProps> = ({ comments }) => {
  return (
    <CommentListContainer>
      {comments.map(comment => (
        <p key={comment._id}>- {comment.content}</p>
      ))}
    </CommentListContainer>
  )
}
