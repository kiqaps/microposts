import React from 'react'

import { PostContainer } from './styles'
import { IPost } from '../../../Models/IPost'

import { format, parseISO } from 'date-fns'

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
    </PostContainer>
  )
}
