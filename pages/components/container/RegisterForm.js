import { useState } from "react";
import TextField from "../atomic/TextField.js";
import { register } from "../../../utils/api-calls";
import styles from "../../../styles/IconBtn.module.css";

export default function LoginForm() {
  const [details, setDetails] = useState({});

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
    return true;
  };

  return (
    <div className="small-padding">
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
