import axios from 'axios'
import { IComment } from '../Models/IComment'

interface ICommentsAPI {
  create: (postId: string, content: string) => Promise<IComment>
  listAll: (postId: string) => Promise<IComment[]>
}

interface IPartialGlobalContext {
  showLoader: () => void
  hideLoader: () => void
}

export const CommentsAPI = ({
  showLoader,
  hideLoader,
}: IPartialGlobalContext): ICommentsAPI => {
  const httpClient = axios.create({
    baseURL: 'http://localhost:3002/api/posts',
  })

  httpClient.interceptors.request.use(
    config => {
      showLoader()
      return config
    },
    error => error,
  )

  httpClient.interceptors.response.use(
    response => {
      hideLoader()
      return response
    },
    error => {
      hideLoader()
      return error
    },
  )

  return {
    async create(postId, content) {
      const response = await httpClient.post<IComment>(`/${postId}/comments`, {
        content,
      })
      return response.data
    },

    async listAll(postId) {
      const response = await httpClient.get<IComment[]>(`/${postId}/comments`, {
        params: {
          sort: {
            createdAt: -1,
          },
        },
      })
      return response.data
    },
  }
}
