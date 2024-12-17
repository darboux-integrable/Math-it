import styles from "./classroom-card.module.css"
import { Show } from "solid-js";

function ClassroomCard({teacher, imgSrc, endDate, startDate, title, passed}){


    const image = document.createElement("img");
    image.classList.add(styles.classImage)
    image.src = imgSrc;

    return (
      <div className={styles.background}>
        <div className={`${styles.content} ${passed ? styles.passed : ""}`}>
          <div className={styles.topContent}>{image}</div>
          <div className={styles.bottomContent}>
            <h2 className={styles.classroomTitle}>{title}</h2>
            <div className={styles.classroomDetailsWrapper}>
                <p className={styles.startDate}>Starts: {startDate}</p>
                <p className={styles.endDate}>Ends: {endDate}</p>
                <p className={styles.teacher}>Teacher: {teacher}</p>
            </div>
          </div>
        </div>
      </div>
    );

}

export default ClassroomCard;