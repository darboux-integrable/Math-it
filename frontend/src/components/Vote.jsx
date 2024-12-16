import styles from "./vote.module.css";
import triangleIcon from "../assets/triangle.svg";

/**
 * A simple UI component with an up arrow, down arrow and count. 
 * It keeps track of the count variable and increments it accordingly
 */
function Vote({ numberOfVotes }) {
  return (
    <div className={styles.upvotesWrapper}>
      <div className={styles.voteButton}>
        <img src={triangleIcon} className={styles.upVote} />
      </div>
      <h3 className={styles.upvotesText}>{numberOfVotes}</h3>
      <div className={styles.voteButton}>
        <img src={triangleIcon} className={styles.downVote} />
      </div>
    </div>
  );
}

export default Vote;
