import { Router } from 'express'
import { postsRouter } from './posts'

export const apiRouter = Router()

apiRouter.use('/posts', postsRouter)
