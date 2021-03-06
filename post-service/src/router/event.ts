import { RequestHandler } from 'express'
import { IEvent, eventbus } from '../services/eventbus'
import { Post } from '../models/Post'
import { Comment } from '../models/Comment'

export const eventHandler: RequestHandler = async (req, res) => {
  const { topic, payload }: IEvent = req.body

  switch (topic) {
    case 'syncPosts':
      eventbus().publish({ topic: 'postsList', payload: await Post.find() })
      break

    case 'newComment':
      if (payload) {
        await Comment.create(payload)
      }
      break

    case 'commentsList':
      if (payload && payload.length > 0) {
        for (const comment of payload) {
          if (!(await Comment.exists({ _id: comment._id }))) {
            await Comment.create(comment)
          }
        }
      }
      break

    default:
      console.log(`${topic} without handler`)
  }

  return res.status(204).send()
}
