import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Column from "./components/container/Column.js";
import LoginForm from "./components/container/LoginForm.js";
import RegisterForm from "./components/container/RegisterForm.js";
import SlideOut from "./components/container/SlideOut.js";
import Nav from "./components/container/Nav.js";
import AppContext from "../utils/AppContext";
import styles from "../styles/Home.module.css";
import { getTasks, authenticate } from "../utils/api-calls";

export default function Home() {
  const [user, setUser] = useState({
    columns: ["Work", "Uni", "Chores", "Projects"],
  });
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState({});
  const [showModal, setShowModal] = useState(false);

  const appData = {
    user,
    setUser,
    token,
    setToken,
    setTasks,
  };

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      // load user data
      authenticate(jwt).then((res) => {
        if (res.user) {
          setUser((state) => res.user);

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

    // filter all tasks into columns
    tasks.map((item) => {
      if (!columns[item.column]) {
        columns[item.column] = [];
      }
      columns[item.column].push(item);
    });

    setFilteredTasks((state) => columns);
  }, [tasks]);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContext.Provider value={appData}>
        <Nav toggleModal={toggleModal} />
        <main className={styles.main}>
          <h1 className={styles.title}>Taskman[ager]</h1>

          <div className={styles.board}>
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
          <div className="flex"></div>
        </main>
        {showModal && (
          <SlideOut toggle={toggleModal}>
            <LoginForm />
            <RegisterForm />
          </SlideOut>
        )}
      </AppContext.Provider>

      <footer className={styles.footer}>
        <p>&copy; Taditech 2021</p>
      </footer>
    </div>
  );
}
