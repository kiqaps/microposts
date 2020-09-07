import { Router } from 'express'
import { commentsRouter } from './comments'

export const apiRouter = Router()

apiRouter.use('/posts', commentsRouter)
