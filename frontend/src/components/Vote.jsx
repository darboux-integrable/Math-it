import styles from "./vote.module.css";
import triangleIcon from "../assets/triangle.svg";
import { createSignal } from "solid-js";

/**
 * A simple UI component with an up arrow, down arrow and count.
 * It keeps track of the count variable and increments it accordingly
 */
function Vote({ itemId, userId }) {
  const [votes, setVotes] = createSignal(0);

  const [userVoteList, setUserVoteList] = createSignal(false);

  fetch(`http://127.0.0.1:5000/upvotes/${itemId}`)
    .then((res) => res.json())
    .then((data) => {
      setUserVoteList(data.user_ids);
      setVotes(data.votes);
    });

  const upvote = () => {
    if (!userVoteList().includes(userId)) {
      setVotes(votes() + 1);
      userVoteList().push(userId);
      saveData();
    }
  };

  const downVote = () => {
    if (!userVoteList().includes(userId)) {
      setVotes(votes() - 1);
      userVoteList().push(userId);
      saveData();
    }
  };

  const saveData = () => {
    fetch(
      `http://127.0.0.1:5000/upvotes/${itemId}?user_id=${userId}&votes=${votes()}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
  };

  return (
    <div className={styles.upvotesWrapper}>
      <div className={styles.voteButton} onclick={() => upvote()}>
        <img src={triangleIcon} className={styles.upVote} />
      </div>
      <h3 className={styles.upvotesText}>{votes()}</h3>
      <div className={styles.voteButton} onclick={() => downVote()}>
        <img src={triangleIcon} className={styles.downVote} />
      </div>
    </div>
  );
}

export default Vote;
