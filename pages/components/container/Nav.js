import { useState, useEffect } from "react";
import IconBtn from "../atomic/IconBtn";
import styles from "../../../styles/Nav.module.css";

export default function Nav({ toggleModal }) {
  return (
    <div className={styles["navbar"]}>
      <div></div>
      <IconBtn src="/account.png" border={true} action={toggleModal} />
    </div>
  );
}
