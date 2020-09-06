import { Document, Schema, model } from 'mongoose'

interface IPostModel extends Document {
  content: string
  votes: number
  createdAt: Date
}

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export const Post = model<IPostModel>('Post', PostSchema)
