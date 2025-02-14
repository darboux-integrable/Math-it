import styles from "./question-tab.module.css";
import { compileText } from "./TextAreaPreview";

import Tag from "./Tag";
function QuestionTab({
  questionId,
  title,
  votes,
  answers,
  views,
  startText,
  tags,
  username,
  delay,
}) {
  const maxLength = 100;

  const updateViews = () => {
    fetch("http://127.0.0.1:5000/questions/" + questionId, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        location.replace(`/questions/${questionId}`);
      });
  };

  return (
    <div
      className={styles.questionTab}
      style={{ "animation-delay": `${delay}ms` }}
      onclick={() => updateViews()}
    >
      <div className={styles.leftContent}>
        <p className={styles.leftText}>{votes || 0} Votes</p>
        <p
          className={styles.leftText}
          class={answers > 0 ? styles.answeredQuestion : " "}
        >
          {answers || 0} Answers
        </p>
        <p className={styles.leftText}>{views || 0} views</p>
      </div>
      <div className={styles.rightContent}>
        <div class={styles.topContent}>
          <h1 className={styles.questionTitle}>{title}</h1>
          <p className={styles.questionText}>
            {compileText(
              startText.length > maxLength
                ? startText.substring(0, maxLength - 3) + "..."
                : startText
            )}
          </p>
        </div>
        <div class={styles.bottomContent}>
          <div class={styles.tags}>
            {tags.map((tag) => {
              return <Tag tagName={tag} />;
            })}
          </div>
          <div class={styles.userSection}>
            <p class={styles.userText}>Asked By {username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionTab;
