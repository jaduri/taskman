import Image from 'next/image'
import styles from '../../../styles/IconBtn.module.css'

export default function IconBtn ({ src, action = f => f }) {

  return (
    <button
    className={styles["icon-btn"]}
    onClick={action}
    >
      <Image src={src} alt="action icon" width={16} height={16} />
    </button>
  )
}
