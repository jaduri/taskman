import styles from '../../../styles/Task.module.css'

export default function Task({ task }) {

  return (
    <div className={styles.task} >
        <p>{ task }</p>
    </div>
  )
}
