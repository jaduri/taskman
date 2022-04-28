import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as tasksApi from "../services/tasks";
import { useBoardContext } from "./BoardContext";

export const ColumnContext = createContext({
  name: "",
  tasks: [],
});

export function ColumnProvider({ children }) {
  const board = useBoardContext();
  const [tasks, setTasks] = useState([]);

  const addTask = async (task) => {
    try {
      const { data } = await tasksApi.create(task);

      if (data.success) {
        board.addTask(data.result);
      }
    } catch (err) {
      // TODO:
    }
  };

  const updateTask = async (id, payload) => {
    try {
      const { data } = await tasksApi.updateById(id, payload);

      if (data.success) {
        board.updateTask(id, data.result);
      }
    } catch (err) {
      // TODO:
    }
  }

  const removeTask = async (id) => {
    try {
      await tasksApi.deleteById(id);

      board.removeTask(id);
    } catch (err) {
      // TODO:
    }
  };

  return (
    <ColumnContext.Provider value={{ tasks, setTasks, addTask, removeTask, updateTask }}>
      {children}
    </ColumnContext.Provider>
  );
}

export const useColumnContext = () => useContext(ColumnContext);
