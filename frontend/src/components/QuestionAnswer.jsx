import styles from "./question-answer.module.css";
import Vote from "./Vote";
import CommentSection from "./CommentSection";

function QuestionAnswer({ upvotes, comments, answerBody }) {
  return (
    <div className={styles.questionAnswerWrapper}>
      <div className={styles.answerWrapper}>
        <Vote numberOfVotes={upvotes} />
        <div className={styles.answerBodyWrapper}>
          <div className={styles.answerBody}>
            <p className={styles.answerText}>{answerBody}</p>
          </div>
        </div>
      </div>
      <CommentSection comments={comments} commmentButtonTheme={"notPrimary"} />
    </div>
  );
}

export default QuestionAnswer;
