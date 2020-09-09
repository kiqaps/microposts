import { RequestHandler } from 'express'
import { IEvent, eventbus } from '../services/eventbus'
import { Comment } from '../models/Comment'
import { Post } from '../models/Post'

export const eventHandler: RequestHandler = async (req, res) => {
  const { topic, payload }: IEvent = req.body

  switch (topic) {
    case 'syncComments':
      eventbus().publish({
        topic: 'commentsList',
        payload: await Comment.find(),
      })
      break

    case 'newPost':
      if (payload) {
        await Post.create(payload)
      }
      break

    case 'postsList':
      if (payload && payload.length > 0) {
        for (const post of payload) {
          if (!(await Post.exists({ _id: post._id }))) {
            await Post.create(post)
          }
        }
      }
      break

    default:
      console.log(`${topic} without handler`)
  }
  return res.status(204).send()
}
