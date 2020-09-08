import axios, { AxiosResponse } from 'axios'

export interface IEvent {
  topic: string
  payload?: any
}

interface IEventBus {
  subscribe: (topic: string) => Promise<AxiosResponse<any>>
  unsubscribe: (topic: string) => Promise<AxiosResponse<any>>
  publish: (event: IEvent) => Promise<AxiosResponse<any>>
}

export const eventbus = (): IEventBus => {
  const httpClient = axios.create({
    baseURL: process.env.EVENTBUS_ADDR,
  })

  const selfAddress = 'http://post_service:3000'

  return {
    subscribe(topic) {
      return httpClient.post('/subscribe', {
        topic,
        address: selfAddress,
      })
    },

    unsubscribe(topic) {
      return httpClient.post('/unsubscribe', {
        topic,
        address: selfAddress,
      })
    },

    publish({ topic, payload }) {
      return httpClient.post('/event', {
        topic,
        payload,
      })
    },
  }
}
