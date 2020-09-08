import express from 'express'
import cors from 'cors'
import axios from 'axios'

import { IListeners } from './IListener'
import { IEvent } from './IEvent'

const app = express()
app.use(express.json())
app.use(cors())

const listeners: IListeners = {}

app.post('/subscribe', (req, res) => {
  const { topic, address } = req.body

  if (!topic || !address) {
    return res.status(400).json({
      error: 'Missing topic or address',
    })
  }

  listeners[topic] = listeners[topic] || []
  listeners[topic].push(address)
  console.log(`- ${address} subscribbed to ${topic}`)
  return res.status(204).send()
})

app.post('/unsubscribe', (req, res) => {
  const { topic, address } = req.body

  if (!topic || !address) {
    return res.status(400).json({
      error: 'Missing topic or address',
    })
  }

  if (listeners[topic]) {
    const index = listeners[topic].findIndex(
      existentAddr => existentAddr === address,
    )
    if (index >= 0) {
      listeners[topic].splice(index, 1)
      console.log(`- ${address} unsubscribbed to ${topic}`)
    }
  }

  return res.status(204).send()
})

app.post('/event', (req, res) => {
  const { topic, payload } = req.body

  if (!topic) {
    return res.status(400).json({
      error: "Missing event's topic",
    })
  }

  const event: IEvent = { topic }
  console.log(`- EVENT: ${topic} received`)
  if (payload) {
    event.payload = payload
    console.log(`\twith payload: ${JSON.stringify(payload)}`)
  }

  if (listeners[topic]) {
    for (const address of listeners[topic]) {
      axios.post(`${address}/event`, event)
    }
  }
  return res.status(204).send()
})

app.listen(3000)
