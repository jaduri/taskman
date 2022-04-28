import { useState, useEffect } from "react";
import Head from "next/head";
import Account from "../ui/components/container/Account.js";
import AuthForms from "../ui/components/container/AuthForms.js";
import EditTaskForm from "../ui/components/container/EditTaskForm.js";
import SlideOut from "../ui/components/container/SlideOut.js";
import Nav from "../ui/components/container/Nav.js";
import { AppProvider, AppContext } from "../state/AppContext";
import styles from "../styles/Home.module.css";
import { BoardProvider } from "../state/BoardContext.jsx";
import { UserProvider } from "../state/UserContext.jsx";
import Board from "../ui/components/container/Board.jsx";

export default function Home() {
  const SlideOutContent = ({ loggedIn = false }) => {
    return loggedIn ? <Account logout={logout} /> : <AuthForms />;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Taskman</title>
        <meta name="description" content="Manage your tasks at a glance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        <AppContext.Consumer>
          {({
            toggleEditModal,
            toggleAuthModal,
            loggedIn,
            showModal,
            showEditModal,
            activeTask
          }) => {
            return (
              <>
                <UserProvider>

                  <Nav toggleModal={toggleAuthModal} loggedin={loggedIn} />

                  <BoardProvider>
                    <Board />
                  </BoardProvider>

                  {showModal && (
                    <SlideOut toggle={toggleAuthModal}>
                      <SlideOutContent loggedin={loggedIn} />
                    </SlideOut>
                  )}

                  {showEditModal && (
                    <SlideOut toggle={toggleEditModal}>
                      <EditTaskForm task={activeTask} />
                    </SlideOut>
                  )}
                </UserProvider>
              </>
            );
          }}
        </AppContext.Consumer>
      </AppProvider>

      <footer className={styles.footer}>
        <p>&copy; Taditech 2021</p>
      </footer>
    </div>
  );
}
