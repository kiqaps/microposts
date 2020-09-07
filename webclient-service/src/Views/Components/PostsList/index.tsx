import React, { useState, useEffect, useContext } from 'react'
import { IPost } from '../../../Models/IPost'
import { PostsAPI } from '../../../Services/PostsAPI'
import { Post } from '../Post'
import { Container } from '../../Layout'
import { GlobalContext } from '../../../Contexts/Global'

export const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const globalContext = useContext(GlobalContext)!

  useEffect(() => {
    ;(async () => {
      const allPosts = await PostsAPI(globalContext).listAll()
      setPosts(allPosts)
    })()
  }, [])

  return (
    <Container>
      {posts && posts.map(post => <Post key={post._id} post={post} />)}
    </Container>
  )
}
