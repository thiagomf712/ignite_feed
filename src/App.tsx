import { Header } from './components/Header'

import './global.css'

import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Post, PostProps } from './components/Post'

interface Posts extends PostProps {
  id: number
}

const posts: Posts[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/thiagomf712.png',
      name: 'Thiago Ferreira',
      role: 'Web Developer',
    },
    content: [
      { type: 'text', content: 'Fala galeraa 👋' },
      {
        type: 'text',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'group',
        content: '',
        contentGroup: [
          { type: 'text', content: '👉' },
          { type: 'link', content: 'jane.design/doctorcare' },
        ],
      },
      {
        type: 'group',
        content: '',
        contentGroup: [
          { type: 'link', content: '#novoprojeto' },
          { type: 'link', content: '#nlw' },
          { type: 'link', content: '#rocketseat' },
        ],
      },
    ],
    publishedAt: new Date('2024-07-28 09:40:00'),
    comments: [],
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/thiagomf712.png',
      name: 'Marcos Silva',
      role: 'Dev Front-End',
    },
    content: [
      { type: 'text', content: 'Fala pessoal 👋' },
      {
        type: 'text',
        content:
          'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻',
      },
      {
        type: 'group',
        content: '',
        contentGroup: [
          { type: 'text', content: 'Acesse e deixe seu feedback 👉' },
          { type: 'link', content: 'devonlane.design' },
        ],
      },
      {
        type: 'group',
        content: '',
        contentGroup: [
          { type: 'link', content: '#uiux' },
          { type: 'link', content: '#userexperience' },
        ],
      },
    ],
    publishedAt: new Date('2024-07-26 08:40:00'),
    comments: [
      {
        id: 1,
        author: {
          avatarUrl: 'https://github.com/thiagomf712.png',
          name: 'Devon Lane',
        },
        content: 'Muito bom Marcos, parabéns!! 👏👏',
        likes: 3,
        publishedAt: new Date('2024-07-26 09:40:00'),
      },
      {
        id: 2,
        author: {
          avatarUrl: 'https://github.com/thiagomf712.png',
          name: 'Jade Santos',
        },
        content: 'Adorei seu novo portifa Marcos!',
        likes: 33,
        publishedAt: new Date('2024-07-26 15:30:00'),
      },
      {
        id: 3,
        author: {
          avatarUrl: 'https://github.com/thiagomf712.png',
          name: 'Luiz Fabiano',
        },
        content: '💜💜',
        likes: 5,
        publishedAt: new Date('2024-07-29 08:40:00'),
      },
    ],
  },
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(({ id, ...post }) => (
            <Post key={id} {...post} />
          ))}
        </main>
      </div>
    </div>
  )
}
