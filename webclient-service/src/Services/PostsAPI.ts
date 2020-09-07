import axios from 'axios'
import { IPost } from '../Models/IPost'

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_POST_SERVICE_BASE_URL,
})

export class PostsAPI {
  static async create(content: string): Promise<IPost> {
    const response = await httpClient.post<IPost>('/', { content })
    return response.data
  }

  static async listAll(): Promise<IPost[]> {
    const response = await httpClient.get<IPost[]>('/')
    return response.data
  }
}
