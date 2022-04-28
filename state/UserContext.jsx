import React, { createContext, useContext, useState, useEffect } from "react";
import * as userApi from "../services/user";
import { useAppContext } from "./AppContext";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const { loggedIn } = useAppContext();
  const [user, setUser] = useState(null);
  const [columns, setColumns] = useState(["work", "chores", "hustle"]);

  // set default column values when user is not logged in
  useEffect(() => {
    if (user) {
      setColumns(user.columns);
    } else {
      setColumns(["work", "chores", "hustle"]);
    }
  }, [user]);

  useEffect(() => {
    if (loggedIn) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [loggedIn]);

  const loadUser = async () => {
    try {
      let response = await userApi.getDetails();

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      // TODO: handle error
    }
  };

  const updateUser = async (payload) => {
    try {
      let response = await userApi.updateDetails(payload);

      if (response.success) {
        setUser(response.user);
      }
    } catch (err) {
      // TODO: handle error
    }
  };

  return (
    <UserContext.Provider value={{ user, loadUser, updateUser, columns }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
