import React from 'react'

import { ToastContainer } from 'react-toastify'

import { Header } from './Views/Layout'
import { CreatePostForm } from './Views/Components/CreatePostForm'
import { PostsList } from './Views/Components/PostsList'

import 'react-toastify/dist/ReactToastify.css'

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <CreatePostForm />
      <PostsList />
      <ToastContainer autoClose={3000} closeOnClick />
    </>
  )
}
