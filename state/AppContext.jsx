import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import api from "../services/api";
import * as auth from "../services/auth";

export const AppContext = createContext({
  login: () => "",
  logout: () => "",
  toggleEditModal: () => "",
  toggleAuthModal: () => "",
  loggedIn: false,
  showModal: false,
  showEditModal: false,
  activeTask: {},
  editTask: () => "",
  updateTask: () => ""
});

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  let func = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await auth.authenticate(refreshToken);

        api.defaults.headers['accessToken'] = response.data.accessToken;


        setLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    }

    init();
  }, []);

  const login = async (email, password) => {
    try {
      let response = await auth.login({ email, password });

      if (response.data.success) {
        api.defaults.headers['accessToken'] = response.data.accessToken;
        localStorage.setItem("refreshToken", response.data.refreshToken);

        setLoggedIn(true);

        toggleAuthModal();
      }
    } catch (err) {
      // TODO:
    }
  };

  const logout = () => {
    auth.logout();
    setLoggedIn((state) => false);
  };

  const toggleEditModal = (task) => {
    setActiveTask((state) => task);
    setShowEditModal((state) => !state);
  };

  const toggleAuthModal = () => {
    setShowModal((state) => !state);
  };

  const editTask = (newFunc) => {
    return func.current = newFunc
  }

  const updateTask = (id, payload) => {
    func.current(id, payload)
  }

  const contextValues = {
    login,
    logout,
    toggleEditModal,
    toggleAuthModal,
    loggedIn,
    showModal,
    showEditModal,
    activeTask,
    editTask,
    updateTask
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
