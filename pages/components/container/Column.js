import { useState, useEffect } from 'react'
import Task from '../composite/Task.js'
import styles from '../../../styles/Column.module.css'
import { createTask } from '../../../utils/api-calls.js'

const defaultTask = {
  summary: "",
  duration: 0,
  status: "",
  done: false,
  notes: "",
  deadline: undefined,
  column: ""
};

export default function Column({ title, columnTasks }) {
  const [ tasks, setTasks ] = useState(columnTasks || []);
  const [ task, setTask ] = useState(defaultTask);

  useEffect(() => {
    if (columnTasks) {
      setTasks(state => columnTasks);
    }
  }, [columnTasks]);

  const handleInput = (event, field) => {

    setTask(state => ({
      ...state,
      [field]: event.target.value
    }));
  }

  const addTask = (event) => {
    event.preventDefault();

    createTask({
      ...task,
      column: title.toLowerCase().split(" ").join("_")
    })
    .then(res => {
      setTasks(state => ([ ...state, res ]));
      setTask(state => defaultTask);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className={styles.column}>
        <div className={styles["column-head"]}>
          <h3 className={styles["column-title"]}>{ title }</h3>
          <div className={styles["add-task"]}>
            <form onSubmit={addTask} className="flex flex-grow">
              <input value={task.summary} onChange={(e) => handleInput(e, "summary")} />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
        {tasks.map(task => <Task key={task._id} setTasks={setTasks} task={task}/>)}
    </div>
  )
}
