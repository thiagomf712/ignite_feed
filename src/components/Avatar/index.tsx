import styles from './Avatar.module.css'

interface AvatarProps {
  src: string
  hasBorder?: boolean
}

export function Avatar({ src, hasBorder = true }: AvatarProps) {
  return (
    <img
      className={`${styles.avatar} ${hasBorder ? styles.avatarBorder : ''}`}
      src={src}
      alt=""
    />
  )
}
