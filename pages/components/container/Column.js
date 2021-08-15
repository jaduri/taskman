import { useState } from 'react'
import Task from '../composite/Task.js'
import styles from '../../../styles/Column.module.css'

export default function Column({ title }) {
  const [ tasks, setTasks ] = useState([]);

  const [ input, setInput ] = useState("");

  const handleInput = (event) => {
    setInput(state => event.target.value);
  }

  const addTask = (event) => {
    event.preventDefault();
    setTasks(state => [...tasks, input]);
    setInput(state => "");
  }

  return (
    <div className={styles.column} >
        <div className={styles["column-head"]}>
          <h3 className={styles["column-title"]}>{ title }</h3>
          <div className={styles["add-task"]}>
            <form onSubmit={addTask} className="flex flex-grow">
              <input value={input} onChange={handleInput} />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
        {tasks.map(task => <Task task={task}/>)}
    </div>
  )
}
