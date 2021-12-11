import { useState, useContext } from "react";
import TextField from "../atomic/TextField.js";
import { updateTask } from "../../../utils/api-calls";
import styles from "../../../styles/Task.module.css";

import AppContext from "../../../utils/AppContext.js";

export default function EditTaskForm({ task }) {
  const [updates, setUpdates] = useState(task);
  const [newItem, setNewItem] = useState("");

  const { setTasks } = useContext(AppContext);

  const handleInput = (event, field) => {
    setUpdates((state) => ({
      ...state,
      [field]: event.target.value,
    }));
  };

  const handleChecklistInput = (event) => {
    setNewItem((state) => event.target.value);
  };

  const addChecklistItem = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let newChecklist = [
      ...updates.checklist,
      {
        checked: false,
        description: newItem,
      },
    ];

    let obj = {};

    updateTask(task._id, { checklist: newChecklist })
      .then((res) => {
        setUpdates((state) => {
          obj = {
            ...state,
            checklist: [...newChecklist]
          };
          return {...obj};
        });

        setTasks((state) => {
          let index = state.findIndex(item => item._id === obj._id);
          let newTasks = [...state];
          newTasks[index] = {...obj};
          return newTasks;
        });

        setNewItem(() => "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = async (e) => {
    e.preventDefault();

    updateTask(task._id, { summary: updates.summary })
      .then((res) => {
        // update tasks in state here
        setTasks((state) => {
          let obj = {
            ...updates,
            summary: updates.summary
          }
          let index = state.findIndex(item => item._id === updates._id);
          let newTasks = [...state];
          newTasks[index] = {...obj};
          return newTasks;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="small-padding">
      <h2>Edit Task</h2>
      <div>
        <TextField
          label="summary"
          value={updates.summary}
          update={(e) => handleInput(e, "summary")}
        />
        <p>Checklist</p>
        <div className={styles.check}>
          {updates.checklist.map((item, i) => {
            return (
              <label key={item.id + "_" + i} htmlFor={item.id + "_" + i}>
                <input
                  type="checkbox"
                  id={item.id + "_" + i}
                  checked={item.checked}
                  readOnly
                />
                <span>{item.description}</span>
              </label>
            );
          })}
        </div>
        <form className={styles["check-input"]} onSubmit={addChecklistItem}>
          <div className={styles["check-input-text"]}>
            <TextField
              label=""
              placeholder="An a new checklist item"
              value={newItem}
              update={handleChecklistInput}
            />
          </div>
          <button type="submit" className={styles["check-input-btn"]}>
            Add Item
          </button>
        </form>
        <button type="button" onClick={submit}>
          Update
        </button>
      </div>
    </div>
  );
}
