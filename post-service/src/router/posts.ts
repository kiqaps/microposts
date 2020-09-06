import { Router } from 'express'

export const postsRouter = Router()

postsRouter.get('/', (req, res) => {
  return res.json({ message: 'ok' })
})
