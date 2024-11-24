import styles from "./user-comment.module.css";
import Vote from "./Vote";

function UserComment({ votes, commentBody, user, dateAsked }) {
  return (
    <div className={styles.commentWrapper}>

      <div className={styles.commentBody}>
        <p className={styles.upvotesText}>{votes}</p>
        <p className={styles.commentText}>
          {commentBody} -{" "}
            <a href="/" className={styles.user}>
              {user}
            </a>
            <strong className={styles.date}> {dateAsked}</strong>
        </p>
       

      </div>
    </div>
  );
}

export default UserComment;