import { useState, useEffect } from "react";
import Task from "../composite/Task.js";
import styles from "../../../styles/SlideOut.module.css";
import { createTask } from "../../../utils/api-calls.js";

export default function Slideout({ children, toggle }) {
  const close = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles["slide-out"]}>
      <div className={styles["overlay"]} onClick={toggle}></div>
      <div className={styles["content"]}>{children}</div>
    </div>
  );
}
