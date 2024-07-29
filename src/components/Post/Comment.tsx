import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from '../Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CommentData } from '.'
import { useState } from 'react'

export interface CommentsProps {
  comment: CommentData
  onDeleteComment: (id: number) => void
}

export function Comment({
  comment: { author, content, likes: likesPost, publishedAt, id },
  onDeleteComment: deleteComment,
}: CommentsProps) {
  const [likes, setLikes] = useState(likesPost)

  const publishedAtFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  )

  const publishedDateTimeElapsed = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleDeleteComment() {
    deleteComment(id)
  }

  function handleLikeComment() {
    setLikes((likesCount) => likesCount + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>

              <time
                title={publishedAtFormatted}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateTimeElapsed}
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir {likes != 0 && <span>{likes}</span>}
          </button>
        </footer>
      </div>
    </div>
  )
}
