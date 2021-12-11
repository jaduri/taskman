import styles from "../../../styles/TextBtn.module.css";

export default function IconBtn({
  text = "Button",
  border = false,
  action = (f) => f,
}) {
  return (
    <button
      className={`${styles["text-btn"]} ${border && "btn-border"}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
