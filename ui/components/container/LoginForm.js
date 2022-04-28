import { useState, useContext } from "react";
import TextField from "../atomic/TextField.js";
import styles from "../../../styles/IconBtn.module.css";

import { useAppContext } from "../../../state/AppContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAppContext();

  const handleInput = (event, field) => {
    if (field === "email") {
      setEmail((state) => event.target.value);
    } else {
      setPassword((state) => event.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className="small-padding">
      <h2>Login</h2>
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
