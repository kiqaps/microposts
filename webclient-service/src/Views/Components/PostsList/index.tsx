import React, { useState, useEffect } from 'react'
import { IPost } from '../../../Models/IPost'
import { PostsAPI } from '../../../Services/PostsAPI'
import { Post } from '../Post'
import { Container } from '../../Layout'

export const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    ;(async () => {
      const allPosts = await PostsAPI.listAll()
      setPosts(allPosts)
    })()
  }, [])

  return (
    <Container>
      {posts && posts.map(post => <Post key={post._id} post={post} />)}
    </Container>
  )
}
