import express from 'express'
import { apiRouter } from './router'

const app = express()

app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log(`Server running at port 3000`)
})
