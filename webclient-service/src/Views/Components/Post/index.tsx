import React from 'react'

import { PostContainer } from './styles'

interface PostProps {
  post: any
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <PostContainer>
      <div className="post">
        <p className="post__content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          temporibus ab ea iure soluta praesentium magnam laborum, dolore
          assumenda nemo aut necessitatibus quasi laudantium doloremque
          obcaecati reprehenderit possimus aspernatur unde.
          <span className="post__date"> on 06/09/2020 at 00:42.</span>
        </p>
      </div>
      <div className="comments">
        {post.comments.map((comment: any, index: any) => (
          <p key={index}>{comment.text}</p>
        ))}
      </div>
    </PostContainer>
  )
}
