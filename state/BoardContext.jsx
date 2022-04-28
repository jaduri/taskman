import React, { useEffect } from "react";
import { useAppContext } from "./AppContext";
import * as tasksApi from '../services/tasks';

import { useUserContext } from "./UserContext.jsx";

export const BoardContext = React.createContext();

export function BoardProvider({ children }) {
  const { columns } = useUserContext();
  const [allTasks, setAllTasks] = React.useState([]);
  const [priorityTasks, setPriorityTasks] = React.useState([]);

  const { loggedIn } = useAppContext();

  useEffect(() => {
    const init = async () => {
      try {
      let columnTasks = {};
      const response = await tasksApi.getAll();
      const tasks = response.data.results || [];

      setAllTasks(tasks);
      } catch (err) {
        // TODO:
      }
    };
    
    if (loggedIn) {
      init();
    }
  }, [loggedIn]);

  // update priorities when tasks are updated
  useEffect(() => {
    setPriorityTasks(() => {
      return allTasks.filter(item => item.deadline == 'today')
    });
  }, [allTasks]);

  const addTask = (task) => {
    setAllTasks(state => [...state, task]);
  }

  const updateTask = (id, task) => {
    setAllTasks(state => state.map(item => {
      if (item._id == id) {
        return task;
      }

      return item;
    }));
  }

  const removeTask = (id) => {
    setAllTasks(state => state.filter(item => item._id != id));
  }

  const contextValues = {
    columns,
    allTasks,
    priorityTasks,
    addTask,
    updateTask,
    removeTask
  };

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoardContext = () => React.useContext(BoardContext);
