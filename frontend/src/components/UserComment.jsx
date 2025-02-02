import styles from "./user-comment.module.css";
import { compileText } from "./TextAreaPreview";
/**
 * This UI Component us used on a question's page. It takes in information about a comment a user made.
 * It then takes this information and formats it neatly. It also keeps track of a vote number like Votes
 * UI Component. The reason that a Vote Component was not used is because the styles for such a component
 * do not look fitting here. 
 */
function UserComment({ commentBody, user, dateAsked }) {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentBody}>
        <div className={styles.textWrapper}>
          <p className={styles.commentText}>
            {compileText(commentBody)} -{" "}
            <a href="/" className={styles.user}>
              {user}
            </a>
            <strong className={styles.date}>{dateAsked}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserComment;