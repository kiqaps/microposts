import { connect, connection } from 'mongoose'

const mongoConnectionURI =
  process.env.MONGO_CONNECTION_URI || 'mongodb://localhost/test'

connection.on('error', err => {
  console.error(`Mongo Connection Error: ${err}`)
})

connection.on('open', () => {
  console.log('Mongo Connection: successfully connected!')
})

connect(mongoConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
