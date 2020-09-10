import { Router } from 'express'
import { isValidObjectId } from 'mongoose'
import { Comment } from '../models/Comment'
import { HttpError } from '../utils/HttpError'
import { eventbus } from '../services/eventbus'
import { Post } from '../models/Post'

export const commentsRouter = Router()

commentsRouter.get('/:postId/comments', async (req, res) => {
  const postId = req.params.postId

  if (!isValidObjectId(postId)) {
    throw new HttpError('Invalid POST ID')
  }

  const jsonSort = req.query.sort as string
  let sort: Record<string, number> = {}

  if (jsonSort) {
    sort = JSON.parse(jsonSort)
  }

  const comments = await Comment.find({
    belongsTo: postId,
  })
    .sort(sort)
    .exec()
  return res.json(comments)
})

commentsRouter.post('/:postId/comments', async (req, res) => {
  const postId = req.params.postId

  if (!isValidObjectId(postId)) {
    throw new HttpError('Invalid POST ID')
  }

  if (!(await Post.exists({ _id: postId }))) {
    throw new HttpError('POST not found')
  }

  let { content } = req.body
  content = (content as string).trim()

  if (!content) {
    throw new HttpError("Missing COMMENT's content")
  }

  const comment = new Comment({ content, belongsTo: postId })
  await comment.save()

  eventbus().publish({ topic: 'newComment', payload: comment })
  return res.json(comment)
})

commentsRouter.post('/:postId/comments/:commentId/vote', async (req, res) => {
  const { postId, commentId } = req.params

  if (!isValidObjectId(postId)) {
    throw new HttpError('Invalid POST ID')
  }

  if (!isValidObjectId(commentId)) {
    throw new HttpError('Invalid COMMENT ID')
  }

  const comment = await Comment.findOne({
    _id: commentId,
    belongsTo: postId,
  })

  if (!comment) {
    throw new HttpError('Comment not found.')
  }

  comment.votes += 1
  await comment.save()
  return res.json(comment)
})

commentsRouter.delete('/:postId/comments/:commentId/vote', async (req, res) => {
  const { postId, commentId } = req.params

  if (!isValidObjectId(postId)) {
    throw new HttpError('Invalid POST ID')
  }

  if (!isValidObjectId(commentId)) {
    throw new HttpError('Invalid COMMENT ID')
  }

  const comment = await Comment.findOne({
    _id: commentId,
    belongsTo: postId,
  })

  if (!comment) {
    throw new HttpError('Comment not found.')
  }

  comment.votes -= 1
  await comment.save()
  return res.json(comment)
})
