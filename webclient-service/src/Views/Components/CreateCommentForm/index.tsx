import React, { useState, FormEvent, useContext } from 'react'
import { CreateCommentFormContainer } from './style'
import { BiCommentAdd } from 'react-icons/bi'
import { CommentsAPI } from '../../../Services/CommentsAPI'
import { GlobalContext } from '../../../Contexts/Global'
import { toast } from 'react-toastify'

interface ICreateCommentFormProps {
  postId: string
}

export const CreateCommentForm: React.FC<ICreateCommentFormProps> = ({
  postId,
}) => {
  const [content, setContent] = useState<string>('')
  const globalContext = useContext(GlobalContext)!

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (content) {
      try {
        const comment = await CommentsAPI(globalContext).create(postId, content)
        globalContext.setPosts(old =>
          old.map(post => {
            if (post._id === postId) {
              post.comments = post.comments || []
              post.comments.unshift(comment)
            }
            return post
          }),
        )
        setContent('')
      } catch (ex) {
        toast.error(ex.response?.data?.error || ex.message)
      }
    }
  }
  return (
    <CreateCommentFormContainer onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="new comment..."
          value={content}
          onChange={evt => setContent(evt.target.value)}
        />
        <button type="submit">
          <BiCommentAdd />
        </button>
      </div>
    </CreateCommentFormContainer>
  )
}
