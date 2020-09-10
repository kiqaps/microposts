import React, { FormEvent, useState, useContext } from 'react'

import { Form } from './style'
import { PostsAPI } from '../../../Services/PostsAPI'
import { Container } from '../../Layout'
import { GlobalContext } from '../../../Contexts/Global'
import { toast } from 'react-toastify'

export const CreatePostForm: React.FC = () => {
  const [content, setContent] = useState<string>('')
  const globalContext = useContext(GlobalContext)!

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (content) {
      try {
        const post = await PostsAPI(globalContext).create(content)
        globalContext.setPosts(old => [post, ...old])
        setContent('')
      } catch (ex) {
        toast.error(ex.response?.data?.error || ex.message)
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New POST's content..."
          value={content}
          onChange={evt => {
            setContent(evt.target.value)
          }}
        />
        <button type="submit">Create</button>
      </Form>
    </Container>
  )
}
