import styles from '../../../styles/Task.module.css'
import TaskActions from './TaskActions.js'

export default function Task({ task, setTasks }) {

  return (
    <div className={styles.task} >
        <TaskActions setTasks={setTasks} taskId={task._id} />
        <p>{ task.summary }</p>
    </div>
  )
}
