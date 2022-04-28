import styles from "../../../styles/IconBtn.module.css";

export default function IconBtn({ src, border = false, action = (f) => f }) {
  return (
    <button
      className={`${styles["icon-btn"]} ${border && "btn-border"}`}
      onClick={action}
    >
      <img src={src} alt="action icon" width={16} height={16} />
    </button>
  );
}
