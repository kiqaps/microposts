import React from 'react'

import { PostContainer } from './styles'
import { IPost } from '../../../Models/IPost'

import { format, parseISO } from 'date-fns'
import { CreateCommentForm } from '../CreateCommentForm'
import { CommentsList } from '../CommentsList'

interface PostProps {
  post: IPost
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const parsedDate = parseISO(post.createdAt)

  return (
    <PostContainer>
      <div className="post">
        <p className="post__content">
          {post.content}
          <span className="post__date">
            {format(parsedDate, " 'on' dd/MM/yyyy 'at' HH:mm")}
          </span>
        </p>
      </div>
      <CreateCommentForm postId={post._id} />
      {post.comments && post.comments.length > 0 && (
        <CommentsList comments={post.comments} />
      )}
    </PostContainer>
  )
}
