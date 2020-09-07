import React, { useContext } from 'react'
import { Post } from '../Post'
import { Container } from '../../Layout'
import { GlobalContext } from '../../../Contexts/Global'

export const PostsList: React.FC = () => {
  const { posts } = useContext(GlobalContext)!

  return (
    <Container>
      {posts && posts.map(post => <Post key={post._id} post={post} />)}
    </Container>
  )
}
