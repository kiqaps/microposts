import axios from 'axios'
import { IPost } from '../Models/IPost'

interface IPostsAPI {
  create: (content: string) => Promise<IPost>
  listAll: () => Promise<IPost[]>
}

export const PostsAPI = ({
  showLoader,
  hideLoader,
}: import('../Contexts/Global').IGlobalContext): IPostsAPI => {
  const httpClient = axios.create({
    baseURL: process.env.REACT_APP_POST_SERVICE_BASE_URL,
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
    async create(content: string): Promise<IPost> {
      const response = await httpClient.post<IPost>('/', { content })
      return response.data
    },

    async listAll(): Promise<IPost[]> {
      const response = await httpClient.get<IPost[]>('/')
      return response.data
    },
  }
}
