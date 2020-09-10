import { Router } from 'express'
import { Post } from '../models/Post'
import { HttpError } from '../utils/HttpError'
import { eventbus } from '../services/eventbus'
import { Comment } from '../models/Comment'

export const postsRouter = Router()

postsRouter.get('/', async (req, res) => {
  const jsonSort = req.query.sort as string
  let sort: Record<string, number> = {}

  if (jsonSort) {
    sort = JSON.parse(jsonSort)
  }

  const posts = (await Post.find().sort(sort).exec()).map(post => ({
    ...post.toObject(),
  }))

  for (const post of posts) {
    post.comments = await Comment.find({ belongsTo: post._id })
      .sort({ createdAt: -1 })
      .exec()
  }

  return res.json(posts)
})

postsRouter.post('/', async (req, res) => {
  let { content } = req.body
  content = (content as string).trim()

  if (!content) {
    throw new HttpError("Missing POST's content")
  }

  const post = new Post({ content })
  await post.save()

  eventbus().publish({ topic: 'newPost', payload: post })
  return res.json(post)
})

postsRouter.post('/:postId/vote', async (req, res) => {
  const id = req.params.postId || ''
  const post = await Post.findById(id)

  if (!post) {
    throw new HttpError("POST doesn't exist.")
  }

  post.votes += 1
  await post.save()
  return res.json(post)
})

postsRouter.delete('/:postId/vote', async (req, res) => {
  const id = req.params.postId || ''
  const post = await Post.findById(id)

  if (!post) {
    throw new HttpError("POST doesn't exist.")
  }

  post.votes -= 1
  await post.save()
  return res.json(post)
})
