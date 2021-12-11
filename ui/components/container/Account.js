import { useState, useEffect, useContext } from "react";
import styles from "../../../styles/Column.module.css";
import { createTask } from "../../../utils/api-calls.js";
import AppContext from "../../../utils/AppContext";

export default function Account({ logout }) {
  const [counts, setCounts] = useState({});
  const { loggedin, setLoggedIn, user, setUser, filteredTasks } = useContext(
    AppContext
  );

  useEffect(() => {
    let counts = {};

    Object.keys(filteredTasks).map((item) => {
      counts[item] = filteredTasks[item].length;
    });

    setCounts((state) => counts);
  }, [filteredTasks]);

  return (
    <div>
      <h2>{user.name}</h2>
      {user.columns.map((item) => {
        item = item.toLowerCase();

        return (
          <p key={item}>
            {item} tasks: {counts[item] || 0}
          </p>
        );
      })}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
