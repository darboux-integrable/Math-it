import styles from "./announcement.module.css";
import closeIcon from "../assets/close.svg";

function Announcement({ title, text, postDate }) {
  return (
    <div className={styles.announcement}>
      <div className={styles.header}>
        <h2 className={styles.announcementTitle}>{title}</h2>
        <div className={styles.closeButtonWrapper}>
          <img src={closeIcon} alt="" className={styles.closeImage}/>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.announcementText}>{text}</p>
        <p className={styles.announcementDate}>Posted: {postDate}</p>
      </div>
    </div>
  );
}

export default Announcement;
