import styles from "./subject-button.module.css";
import gearIcon from "../assets/gear.svg"

function subjectButton({ title, icon }) {
  return (
    <div className={styles.subjectButton}>
      <img src={icon || gearIcon} alt="" className={styles.subjectImage} />

      <p className={styles.subjectTitle}>{title}</p>
    </div>
  );
}

export default subjectButton;
