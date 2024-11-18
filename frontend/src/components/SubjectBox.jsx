import styles from "./subject-box.module.css";


function SubjectBox({ title, description, topics }) {



  return (
    <div className={styles.boxBackground}>
        <div className={styles.subjectBox}>
          <div className={styles.boxHead}>
            <h1 className={styles.subjectBoxTitle}>{title || "Math Topic"}</h1>
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