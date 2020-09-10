import express from 'express'
import cors from 'cors'
import axios, { AxiosResponse } from 'axios'

import { IListeners } from './IListener'
import { IEvent } from './IEvent'
import { NotifyError } from './NotifyError'

interface IEventQueue {
  [topic: string]: IEvent[]
}

const app = express()
app.use(express.json())
app.use(cors())

const listeners: IListeners = {}
const eventQueue: IEventQueue = {}

app.post('/subscribe', async (req, res) => {
  const { topic, address } = req.body

  if (!topic || !address) {
    return res.status(400).json({
      error: 'Missing topic or address',
    })
  }

  if (eventQueue[topic] && eventQueue[topic].length > 0) {
    for (const event of eventQueue[topic]) {
      await axios.post(`${address}/event`, event)
    }
    delete eventQueue[topic]
  }

  listeners[topic] = listeners[topic] || []

  if (!listeners[topic].includes(address)) {
    listeners[topic].push(address)
    console.log(`- ${address} subscribbed to ${topic}`)
  }
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

app.post('/event', async (req, res) => {
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

  let atLeastOneNotified = false
  if (listeners[topic]) {
    const results = await Promise.allSettled(
      listeners[topic].map(
        address =>
          new Promise<AxiosResponse<any>>((resolve, reject) => {
            axios
              .post(`${address}/event`, event)
              .then(resolve)
              .catch(err => {
                reject(new NotifyError(err.message, address))
              })
          }),
      ),
    )

    for (const result of results) {
      if (result.status === 'rejected') {
        const { listenerAddress } = result.reason as NotifyError
        listeners[topic] = listeners[topic].filter(
          address => address !== listenerAddress,
        )
      } else {
        atLeastOneNotified = true
      }
    }
  }

  if (!atLeastOneNotified) {
    eventQueue[topic] = eventQueue[topic] || []
    eventQueue[topic].push(event)
  }

  return res.status(204).send()
})

app.listen(3000)
