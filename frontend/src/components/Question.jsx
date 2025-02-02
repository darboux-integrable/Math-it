import styles from "./question.module.css";
import Vote from "./Vote";
import Tag from "./Tag";
import CommentSection from "./CommentSection";
import { compileText } from "./TextAreaPreview";
function Question({
  title,
  userAsking,
  askedDate,
  views,
  comments,
  questionBody,
  tags,
  questionId,
  userId
}) {

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.titleSection}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.titleSectionBottom}>
            <p className={styles.questionHeaderData}>
              {userAsking} Asked {askedDate}
            </p>
            <p className={styles.questionHeaderData}>Viewed {views} times</p>
          </div>
        </div>
        <button
          className={styles.askButton}
          onclick={() => {
            location.replace("/questions/ask");
          }}
        >
          Ask a Question
        </button>
      </div>
      <div className={styles.questionBody}>
        <Vote itemId={questionId} userId={userId}/>
        <div className={styles.questionTextWrapper}>{compileText(questionBody)}</div>
      </div>
      <div className={styles.commentSectionWrapper}>
        <CommentSection commentType={"forums"} comments={comments} questionId={questionId}/>
      </div>
      <div className={styles.tagsWrapper}>
        {tags.map((tag) => {
          return <Tag tagName={tag} />;
        })}
      </div>
    </div>
  );
}

export default Question;
