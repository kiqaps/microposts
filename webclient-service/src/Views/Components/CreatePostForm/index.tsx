import React, { FormEvent, useState } from 'react'

import { Form } from './style'
import { PostsAPI } from '../../../Services/PostsAPI'
import { Container } from '../../Layout'

export const CreatePostForm: React.FC = () => {
  const [content, setContent] = useState<string>('')

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (content) {
      await PostsAPI.create(content)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New POST's content..."
          defaultValue={content}
          onChange={evt => {
            setContent(evt.target.value)
          }}
        />
        <button type="submit">Create</button>
      </Form>
    </Container>
  )
}
