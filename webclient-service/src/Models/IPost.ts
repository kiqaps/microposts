import { IComment } from './IComment'

export interface IPost {
  _id: string
  content: string
  votes: number
  createdAt: string
  comments: IComment[]
}
