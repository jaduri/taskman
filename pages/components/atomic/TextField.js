import { useState } from "react";
import styles from "../../../styles/TextField.module.css";

export default function TextField({
  label = "",
  value = "",
  type = "text",
  update = (f) => f,
}) {
  return (
    <div className={styles["text-field"]}>
      <label>{label}</label>
      <input type={type} onChange={update} value={value} />
    </div>
  );
}
