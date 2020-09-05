import express from 'express'

const app = express()

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello CommentService!',
  })
})

app.listen(3000, () => {
  console.log(`Server running at port 3000`)
})
