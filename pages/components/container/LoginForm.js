import { useState, useContext } from "react";
import TextField from "../atomic/TextField.js";
import { login, getTasks } from "../../../utils/api-calls";
import styles from "../../../styles/IconBtn.module.css";

import AppContext from "../../../utils/AppContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setTasks } = useContext(AppContext);

  const handleInput = (event, field) => {
    if (field === "email") {
      setEmail((state) => event.target.value);
    } else {
      setPassword((state) => event.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    let response = await login({ email: email, password: password });

    if (response.success) {
      setUser((state) => response.user);
      localStorage.setItem("token", response.token);

      getTasks()
        .then((res) => {
          setTasks((state) => res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="small-padding">
      <form onSubmit={submit}>
        <TextField
          label="email"
          value={email}
          update={(e) => handleInput(e, "email")}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          update={(e) => handleInput(e, "password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
