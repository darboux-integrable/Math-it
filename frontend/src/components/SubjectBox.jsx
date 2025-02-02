import { createSignal } from "solid-js";
import styles from "./subject-box.module.css";

function SubjectBox({ title, description, topics, color, setTopics, getTopics }) {

  return (
    <div className={styles.boxBackground}>
        <div className={styles.subjectBox}>
          <div className={styles.boxHead}>
            <div className={styles.titleWrapper}>
              <div className={styles.colorBox} style={{"background-color": color}}></div>
              <h1 className={styles.subjectBoxTitle}>{title || "Math Topic"}</h1>
            </div>
          </div>
          <div className={styles.boxContent}>
            <p className={styles.shortDescription}>{description}</p>
            <div className={styles.topicsWrapper}>
              {topics.map((topic) => {
                const [active, setActive] = createSignal(false);
                return <button className={`${styles.topicTitle} ${active() ? styles.active : " "}`} onclick={() => {
                  if(!getTopics().includes(topic.id)){
                    setTopics([...getTopics(), topic.id])
                    setActive(true);
                  } else {
                    setActive(false);
                    setTopics(getTopics().filter(currentTopic => currentTopic != topic.id));
                  }
                }} >{topic.name}</button>;
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

export default SubjectBox;