import { useState, useContext } from "react";
import TextField from "../atomic/TextField.js";
import { register, getTasks } from "../../../utils/api-calls";
import styles from "../../../styles/IconBtn.module.css";

import AppContext from "../../../utils/AppContext";

export default function RegisterForm() {
  const [details, setDetails] = useState({});

  const { setUser, setTasks, toggleAuthModal, setLoggedIn } = useContext(
    AppContext
  );

  const handleInput = (event, field) => {
    setDetails((state) => ({
      ...state,
      [field]: event.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    let response = await register({
      name: details.name,
      email: details.email,
      password: details.password,
    });

    if (response.success) {
      setUser((state) => response.user);
      setLoggedIn(() => true);
      localStorage.setItem("token", response.token);

      getTasks()
        .then((res) => {
          setTasks((state) => res);
        })
        .catch((err) => {
          console.error(err);
        });

      toggleAuthModal();
    }
  };

  return (
    <div className="small-padding">
      <h2>Create an account</h2>
      <form onSubmit={submit}>
        <TextField
          label="name"
          value={details.name}
          update={(e) => handleInput(e, "name")}
        />
        <TextField
          label="email"
          value={details.email}
          update={(e) => handleInput(e, "email")}
        />
        <TextField
          label="password"
          type="password"
          value={details.password}
          update={(e) => handleInput(e, "password")}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
