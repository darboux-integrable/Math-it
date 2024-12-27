import styles from "./announcement.module.css";
import { compileText } from "./TextAreaPreview";

function Announcement({ title, text, postDate }) {
  return (
    <div className={styles.announcement}>
      <div className={styles.header}>
        <h2 className={styles.announcementTitle}>{title}</h2>
      </div>
      <div className={styles.body}>
        <p className={styles.announcementText}>
          {compileText(text).map((element) => {
            return element;
          })}
        </p>
        <p className={styles.announcementDate}>Posted: {postDate}</p>
      </div>
    </div>
  );
}

export default Announcement;
