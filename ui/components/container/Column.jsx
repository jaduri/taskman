import { useState, useEffect, useContext } from "react";
import Task from "../composite/Task.js";
import styles from "../../../styles/Column.module.css";
import AppContext from "../../../utils/AppContext";

const defaultTask = {
  summary: "",
  duration: 0,
  status: "",
  done: false,
  notes: "",
  deadline: undefined,
  column: "",
};

export default function Column({ title, tasks = [], addTask }) {
  const [newTask, setNewTask] = useState({
    ...defaultTask,
    column: title.toLowerCase().split(" ").join("_"),
  });

  const handleInput = (event, field) => {
    setNewTask((state) => ({
      ...state,
      [field]: event.target.value,
    }));
  };

  return (
    <div className={styles.column}>
      <div className={styles["column-head"]}>
        <h3 className={styles["column-title"]}>{title}</h3>
        <div className={styles["add-task"]}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask(newTask).then(() => {
                setNewTask({
                  ...defaultTask,
                  column: title.toLowerCase().split(" ").join("_"),
                })
              })
            }}
            className="flex flex-grow"
          >
            <input
              value={newTask.summary}
              onChange={(e) => handleInput(e, "summary")}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      <div className={styles["column-body"]}>
        {tasks.map((task) => {
          return <Task key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
}
