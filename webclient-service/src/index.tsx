import React from 'react'
import ReactDOM from 'react-dom'

import { GlobalStyle } from './Styles/globalStyles'
import { Header, Container } from './Views/Layout'
import { Post } from './Views/Components/Post'

const posts = [
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit quo vitae sunt consequuntur commodi quos cupiditate quia eum id praesentium. A itaque quae totam architecto, ratione dicta tempore omnis laudantium.',
    date: 'on 06/09/2020 at 00:42.',
    comments: [{ text: 'Comentário 1' }, { text: 'Comentário 2' }],
  },
  {
    title:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, in aut nisi ducimus expedita, iusto praesentium magnam quo debitis earum consequatur repellendus enim quaerat necessitatibus! Repellendus odit saepe voluptatem eveniet.',
    date: 'on 06/09/2020 at 00:42.',
    comments: [
      { text: 'Comentário 1' },
      { text: 'Comentário 2' },
      { text: 'Comentário 1' },
      { text: 'Comentário 2' },
      { text: 'Comentário 1' },
      { text: 'Comentário 2' },
    ],
  },
  {
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa saepe, inventore quis repellat impedit, consectetur accusantium laudantium non quos ullam repellendus! Ratione impedit pariatur illo exercitationem id aliquam repellat.',
    date: 'on 06/09/2020 at 00:42.',
    comments: [{ text: 'Comentário 1' }, { text: 'Comentário 2' }],
  },
]

ReactDOM.render(
  <>
    <Header />
    <Container>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Container>
    <GlobalStyle />
  </>,
  document.getElementById('root'),
)
