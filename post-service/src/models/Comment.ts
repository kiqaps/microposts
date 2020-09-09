import { Document, Schema, model, Types } from 'mongoose'

interface ICommentModel extends Document {
  belongsTo: Types.ObjectId
  content: string
  votes: number
  createdAt: Date
}

const CommentSchema = new Schema({
  belongsTo: {
    type: Types.ObjectId,
    ref: 'Post',
    required: true,
  },
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

export const Comment = model<ICommentModel>('Comment', CommentSchema)
