import { useState } from "react";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import TextBtn from "../atomic/TextBtn.js";

export default function AuthForms() {
  const [login, setLogin] = useState(true);

  const toggleAuthForm = () => {
    setLogin((state) => !state);
  };

  return (
    <div>
      {login ? (
        <LoginForm close={toggleAuthForm} />
      ) : (
        <RegisterForm close={toggleAuthForm} />
      )}
      <div className="btn-container-center">
        <TextBtn
          action={toggleAuthForm}
          text={`or ${login ? "Register" : "Login"}`}
        />
      </div>
    </div>
  );
}
