import styles from "./user-comment.module.css";

/**
 * This UI Component us used on a question's page. It takes in information about a comment a user made.
 * It then takes this information and formats it neatly. It also keeps track of a vote number like Votes
 * UI Component. The reason that a Vote Component was not used is because the styles for such a component
 * do not look fitting here. 
 */
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