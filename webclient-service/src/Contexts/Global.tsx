import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { Spinner } from '../Views/Components/Spinner'
import { IPost } from '../Models/IPost'
import { PostsAPI } from '../Services/PostsAPI'
import { CommentsAPI } from '../Services/CommentsAPI'

export interface IGlobalContext {
  showLoader: () => void
  hideLoader: () => void
  posts: IPost[]
  setPosts: Dispatch<SetStateAction<IPost[]>>
}

export const GlobalContext = createContext<IGlobalContext | null>(null)

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [loaderCount, setLoaderCount] = useState(0)
  const [posts, setPosts] = useState<IPost[]>([])

  const showLoader = () => {
    setLoaderCount(old => old + 1)
  }

  const hideLoader = () => {
    setLoaderCount(old => (old > 0 ? old - 1 : 0))
  }

  useEffect(() => {
    ;(async () => {
      const allPosts = await PostsAPI({ showLoader, hideLoader }).listAll()
      setPosts(allPosts)
    })()
  }, [])

  return (
    <GlobalContext.Provider value={{ showLoader, hideLoader, posts, setPosts }}>
      {children}
      {loaderCount > 0 && <Spinner />}
    </GlobalContext.Provider>
  )
}
