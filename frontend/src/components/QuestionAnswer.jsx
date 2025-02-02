import styles from "./question-answer.module.css";
import Vote from "./Vote";
import CommentSection from "./CommentSection";
import { compileText } from "./TextAreaPreview";
import { createSignal, Show } from "solid-js";

function QuestionAnswer({
  comments,
  answerBody,
  userType,
  user,
  questionId,
  answerId,
  userId
}) {
  const [commentsArray, setCommentsArray] = createSignal(false);

  fetch("http://127.0.0.1:5000/user_comments/all_comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: comments }),
  })
    .then((res) => res.json())
    .then((data) => {
      setCommentsArray(data);
    });

  return (
    <div className={styles.questionAnswerWrapper}>
      <div className={styles.answerWrapper}>
        <Vote userId={userId} itemId={answerId} />
        <div className={styles.answerBodyWrapper}>
          <div className={styles.answerBody}>
            <p className={styles.answerText}>{compileText(answerBody)}</p>
          </div>
        </div>
      </div>
      <Show when={commentsArray()}>
        <CommentSection
          commentType={"answers"}
          comments={commentsArray()}
          questionId={questionId}
          commmentButtonTheme={"notPrimary"}
        />
      </Show>
      {() => {
        commentsArray();
        MathJax.typeset();
      }}
    </div>
  );
}

export default QuestionAnswer;
