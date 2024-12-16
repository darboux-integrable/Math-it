import styles from "./subject-box.module.css";


function SubjectBox({ title, description, topics, color }) {

  return (
    <div className={styles.boxBackground}>
        <div className={styles.subjectBox}>
          <div className={styles.boxHead}>
            <div className={styles.titleWrapper}>
              <div className={styles.colorBox} style={{"background-color": color}}></div>
              <h1 className={styles.subjectBoxTitle}>{title || "Math Topic"}</h1>
            </div>
            <button className={styles.goButton}>Go!</button>
          </div>
          <div className={styles.boxContent}>
            <p className={styles.shortDescription}>{description}</p>
            <div className={styles.topicsWrapper}>
              {topics.map((topic) => {
                return <button className={styles.topicTitle}>{topic}</button>;
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

export default SubjectBox;