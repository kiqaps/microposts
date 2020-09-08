import axios from 'axios'
import { IPost } from '../Models/IPost'

interface IPostsAPI {
  create: (content: string) => Promise<IPost>
  listAll: () => Promise<IPost[]>
}

interface IPartialGlobalContext {
  showLoader: () => void
  hideLoader: () => void
}

export const PostsAPI = ({
  showLoader,
  hideLoader,
}: IPartialGlobalContext): IPostsAPI => {
  const httpClient = axios.create({
    baseURL: 'http://localhost:3001/api/posts',
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
    async create(content) {
      const response = await httpClient.post<IPost>('/', { content })
      return response.data
    },

    async listAll() {
      const response = await httpClient.get<IPost[]>('/', {
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
