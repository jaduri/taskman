import { useContext } from "react";
import styles from "../../../styles/Task.module.css";
import IconBtn from "../atomic/IconBtn.js";
import { deleteTask, updateTask } from "../../../utils/api-calls";
import AppContext from "../../../utils/AppContext.js";

export default function TaskActions({ setTasks, task, taskId }) {
  const { setPriorities, toggleEditModal } = useContext(AppContext);

  const deleteAction = () => {
    // remove task from state
    if (confirm("This action is not reversible! Confirm below to proceed.")) {
      deleteTask(taskId)
        .then((res) => {
          if (res.deletedCount === 1) {
            setTasks((state) => {
              return state.filter((item) => {
                return item._id !== taskId;
              });
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const taskDone = () => {
    // mark task as done
    updateTask(taskId, { done: true })
      .then((res) => {
        setTasks((state) => {
          return state.filter((item) => {
            return item._id !== taskId;
          });
        });
      })
      .catch((err) => console.log(err));
  };

  const prioritize = () => {
    if (task.deadline === "today") return;

    updateTask(taskId, { deadline: "today" }).then((res) => {
      setPriorities((state) => [...state, task]);
    });
  };

  return (
    <div className={styles["task-actions"]}>
      <IconBtn src="/edit.png" action={() => toggleEditModal(task)} />
      <IconBtn src="/time.png" action={prioritize} />
      <IconBtn src="/check.png" action={taskDone} />
      <IconBtn src="/remove.png" action={deleteAction} />
    </div>
  );
}
