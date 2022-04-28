import { useState, useEffect } from "react";
import styles from "../../../styles/Task.module.css";
import TaskActions from "./TaskActions.js";
import { updateTask } from "../../../utils/api-calls.js";
import { useDidMountEffect } from "../../../utils/custom-hooks.js";

export default function Task({ task, setTasks }) {
  const [checklist, setChecklist] = useState([]);

  const updateChecklist = (event, i) => {
    let temp = [...checklist];

    temp.splice(i, 1, {
      ...temp[i],
      checked: !temp[i].checked,
    });

    updateTask(task._id, { checklist: temp })
      .then((res) => {
        setChecklist((state) => {
          return [...temp];
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (task && task.checklist) {
      setChecklist(() => [...task.checklist]);
    }
  }, [task]);

  return (
    <div className={styles.task}>
      <TaskActions setTasks={setTasks} task={task} taskId={task._id} />
      <p>{task.summary}</p>
      <div className={styles.check}>
        {checklist.map((item, i) => {
          return (
            <label
              htmlFor={`${task.column}_${task._id}_${i}`}
              key={`${task.column}_${task._id}_${i}`}
            >
              <input
                id={`${task.column}_${task._id}_${i}`}
                type="checkbox"
                defaultChecked={item.checked}
                onChange={(e) => updateChecklist(e, i)}
              />
              <span>{item.description}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      task: {},
    },
  };
}
