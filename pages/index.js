import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Column from "../ui/components/container/Column.js";
import Account from "../ui/components/container/Account.js";
import AuthForms from "../ui/components/container/AuthForms.js";
import EditTaskForm from "../ui/components/container/EditTaskForm.js";
import SlideOut from "../ui/components/container/SlideOut.js";
import Nav from "../ui/components/container/Nav.js";
import AppContext from "../utils/AppContext";
import styles from "../styles/Home.module.css";
import { getTasks, authenticate } from "../utils/api-calls";

export default function Home() {
  const [user, setUser] = useState({
    columns: ["Work", "Uni", "Chores", "Projects"],
  });
  const [loggedin, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [priorities, setPriorities] = useState([]);

  const toggleEditModal = (task) => {
    setActiveTask((state) => task);
    setShowEditModal((state) => !state);
  };

  const appData = {
    user,
    setUser,
    token,
    setToken,
    setTasks,
    loggedin,
    setLoggedIn,
    filteredTasks,
    setPriorities,
    toggleEditModal,
  };

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      // load user data
      authenticate(jwt).then((res) => {
        if (res.user) {
          setUser((state) => res.user);
          setLoggedIn((state) => true);

          getTasks()
            .then((res) => {
              setTasks((state) => res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      // use default data
    }
  }, []);

  useEffect(() => {
    let columns = {};
    let today = [];

    // filter all tasks into columns
    tasks.map((item) => {
      if (!columns[item.column]) {
        columns[item.column] = [];
      }

      columns[item.column].push(item);

      if (item.deadline === "today") {
        today.push(item);
      }
    });

    setPriorities((state) => today);
    setFilteredTasks((state) => columns);
  }, [tasks]);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn((state) => false);
    setTasks((state) => []);
    setToken((state) => "");
  };

  const SlideOutContent = ({ loggedin = false }) => {
    return loggedin ? <Account logout={logout} /> : <AuthForms />;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Taskman</title>
        <meta name="description" content="Manage your tasks at a glance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContext.Provider value={appData}>
        <Nav toggleModal={toggleModal} loggedin={loggedin} />
        <div className={styles.board}>
          <Column
            columnTasks={priorities}
            setPriorities={setPriorities}
            title="Today"
          ></Column>
          {user.columns.map((column, i) => {
            let columnName = column.toLowerCase().split(" ").join("_");
            return (
              <Column
                key={columnName + i}
                columnTasks={filteredTasks[columnName]}
                setTasks={setTasks}
                title={columnName}
              ></Column>
            );
          })}
        </div>
        {showModal && (
          <SlideOut toggle={toggleModal}>
            <SlideOutContent loggedin={loggedin} />
          </SlideOut>
        )}

        {showEditModal && (
          <SlideOut toggle={toggleEditModal}>
            <EditTaskForm task={activeTask} />
          </SlideOut>
        )}
      </AppContext.Provider>

      <footer className={styles.footer}>
        <p>&copy; Taditech 2021</p>
      </footer>
    </div>
  );
}
