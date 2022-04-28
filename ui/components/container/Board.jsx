import { useCallback, useEffect, useMemo, useState } from "react";
import Column from "./Column.jsx";
import styles from "../../../styles/Home.module.css";
import {
  ColumnProvider,
  ColumnContext,
} from "../../../state/ColumnContext.jsx";

import { useBoardContext } from "../../../state/BoardContext.jsx";

export default function Board() {
  const { columns, priorityTasks, allTasks } = useBoardContext();

  const filterColumnTasks = useCallback((column) => {
    return allTasks.filter(item => item.column == column)
  }, [allTasks]);

  return (
    <div>
      <div className={styles.board}>
        <Column title="Today" tasks={priorityTasks}></Column>

        {columns.map((column) => {
          
          let columnName = column.toLowerCase().split(" ").join("_");

          return (
            <ColumnProvider
              key={columnName}
            >
              <ColumnContext.Consumer>
                {({ addTask }) => {
                  return (
                    <Column
                      key={columnName}
                      addTask={addTask}
                      title={column}
                      tasks={filterColumnTasks(column)}
                    ></Column>
                  );
                }}
              </ColumnContext.Consumer>
            </ColumnProvider>
          );
        })}

        <button>Add Column</button>
      </div>
    </div>
  );
}
