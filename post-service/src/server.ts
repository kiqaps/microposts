import './database'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import cors from 'cors'

import { apiRouter } from './router'
import { HttpError } from './utils/HttpError'
import { eventbus } from './services/eventbus'
import { eventHandler } from './router/event'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/event', eventHandler)
app.use('/api', apiRouter)

app.use((err: any, _r: Request, res: Response, _n: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }

  let error = 'Internal Server Error'

  if (typeof err === 'string') {
    error = err
  } else {
    if (err && err.message) {
      error = err.message
    }
  }
  return res.status(500).json({ error })
})

app.listen(3000, () => {
  console.log(`Server running at port 3000`)

  eventbus().subscribe('newComment')
  eventbus().subscribe('commentsList')
  eventbus().subscribe('syncPosts')
  eventbus().publish({ topic: 'syncComments' })
})
