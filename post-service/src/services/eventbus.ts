import axios from 'axios'

export interface IEvent {
  topic: string
  payload?: any
}

interface IEventBus {
  subscribe: (topic: string) => Promise<void>
  unsubscribe: (topic: string) => Promise<void>
  publish: (event: IEvent) => Promise<void>
}

export const eventbus = (): IEventBus => {
  const httpClient = axios.create({
    baseURL: process.env.EVENTBUS_ADDR,
  })

  const selfAddress = 'http://post_service:3000'

  return {
    async subscribe(topic) {
      try {
        await httpClient.post('/subscribe', {
          topic,
          address: selfAddress,
        })
      } catch {}
    },

    async unsubscribe(topic) {
      try {
        await httpClient.post('/unsubscribe', {
          topic,
          address: selfAddress,
        })
      } catch {}
    },

    async publish({ topic, payload }) {
      try {
        await httpClient.post('/event', {
          topic,
          payload,
        })
      } catch {}
    },
  }
}
