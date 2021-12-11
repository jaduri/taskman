import { useState, useEffect } from "react";
import TextBtn from "../atomic/TextBtn";
import styles from "../../../styles/Nav.module.css";

export default function Nav({ toggleModal, loggedin }) {
  return (
    <div className={styles["navbar"]}>
      <div>
        <h1 className={styles.title}>Taskman[ager]</h1>
      </div>
      <TextBtn
        border={true}
        action={toggleModal}
        text={loggedin ? "Account" : "Login / Register"}
      />
    </div>
  );
}
