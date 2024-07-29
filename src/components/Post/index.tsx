import { compareDesc, format, formatDistanceToNow } from 'date-fns'
import { Avatar } from '../Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ptBR } from 'date-fns/locale'
import { ChangeEvent, FormEvent, useState } from 'react'

export interface Author {
  avatarUrl: string
  name: string
  role: string
}

export interface Content {
  type: 'text' | 'link' | 'group'
  content: string
  contentGroup?: Content[]
}

export interface CommentData {
  id: number
  author: {
    avatarUrl: string
    name: string
  }
  content: string
  publishedAt: Date
  likes: number
}

export interface PostProps {
  author: Author
  publishedAt: Date
  content: Content[]
  comments: CommentData[]
}

export function Post({
  author,
  content,
  publishedAt,
  comments: commentsInitial,
}: PostProps) {
  const [comments, setComments] = useState<CommentData[]>(commentsInitial)
  const [newCommentText, setNewCommentText] = useState('')

  const publishedAtFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  )

  const publishedDateTimeElapsed = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const isNewCommentTextEmpty = newCommentText.trim() === ''

  function handleCreateComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newCommentText.trim() !== '') {
      const publishedAt = new Date()

      const newComment: CommentData = {
        id: publishedAt.getTime(),
        author: {
          avatarUrl: 'https://github.com/thiagomf712.png',
          name: 'Thiago Ferreira',
        },
        publishedAt,
        content: newCommentText,
        likes: 0,
      }

      setComments((prev) => [...prev, newComment])

      setNewCommentText('')
    }
  }

  function handleChangeNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement

    target.setCustomValidity('')

    setNewCommentText(target.value)
  }

  function handleNewCommentInvalid(event: FormEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement

    target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment(commentId: number) {
    setComments((prev) => prev.filter(({ id }) => id !== commentId))
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}>
          Publicado {publishedDateTimeElapsed}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          switch (item.type) {
            case 'text':
              return <p key={item.content}>{item.content}</p>
            case 'link':
              return (
                <p key={item.content}>
                  <a href="#">{item.content}</a>
                </p>
              )
            case 'group':
              return (
                <p key={item.content}>
                  {item.contentGroup?.map((groupItem) => {
                    if (groupItem.type === 'text') {
                      return `${groupItem.content} `
                    }

                    return (
                      <a key={groupItem.content} href="#">
                        {groupItem.content}{' '}
                      </a>
                    )
                  })}
                </p>
              )
            default:
              return <></>
          }
        })}
      </div>

      <form
        action="POST"
        className={styles.commentForm}
        onSubmit={handleCreateComment}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={handleChangeNewComment}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={isNewCommentTextEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentsList}>
        {comments
          .sort((commentLeft, commentRight) =>
            compareDesc(commentLeft.publishedAt, commentRight.publishedAt)
          )
          .map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDeleteComment={deleteComment}
            />
          ))}
      </div>
    </article>
  )
}
