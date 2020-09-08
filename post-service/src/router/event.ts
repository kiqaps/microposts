import { RequestHandler } from 'express'
import { IEvent } from '../services/eventbus'

export const eventHandler: RequestHandler = (req, res) => {
  const event: IEvent = req.body

  switch (event.topic) {
    case 'newComment':
      console.log('novo comentário')
      break

    default:
      console.log(`${event.topic} without handler`)
  }

  return res.status(204).send()
}
