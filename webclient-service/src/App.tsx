import React from 'react'
import { Header } from './Views/Layout'
import { CreatePostForm } from './Views/Components/CreatePostForm'
import { PostsList } from './Views/Components/PostsList'

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <CreatePostForm />
      <PostsList />
    </>
  )
}
