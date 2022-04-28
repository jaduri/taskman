import { useContext } from "react";
import styles from "../../../styles/Task.module.css";
import IconBtn from "../atomic/IconBtn.js";
import { useColumnContext } from "../../../state/ColumnContext.jsx";
import { useBoardContext } from "../../../state/BoardContext.jsx";
import { useAppContext } from "../../../state/AppContext.jsx";

export default function TaskActions({ setTasks, task, taskId }) {
  const { removeTask, updateTask } = useColumnContext();
  const { addPriorityTask } = useBoardContext();
  const { toggleEditModal, editTask } = useAppContext();

  const deleteAction = () => {
    // remove task from state
    if (confirm("This action is not reversible! Confirm below to proceed.")) {
      removeTask(taskId).catch((err) => console.log(err));
    }
  };

  const taskDone = () => {
    // mark task as done
    updateTask(taskId, { done: true });
  };

  const prioritize = () => {
    if (task.deadline === "today") return;

    updateTask(taskId, { deadline: "today" }).then((res) => {
      addPriorityTask(task);
    });
  };

  return (
    <div className={styles["task-actions"]}>
      <IconBtn src="/edit.png" action={() => {
        toggleEditModal(task);
        editTask(updateTask);
      }} />
      <IconBtn src="/time.png" action={prioritize} />
      <IconBtn src="/check.png" action={taskDone} />
      <IconBtn src="/remove.png" action={deleteAction} />
    </div>
  );
}
