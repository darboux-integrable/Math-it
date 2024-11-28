import { createSignal, createEffect } from "solid-js";
import styles from "./ask-question-page.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";

function AskQuestionPage() {
  const [title, setTitle] = createSignal("");

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <div className={styles.pageTitleSection}>
          <h1 className={styles.pageTitle}>Ask a Question</h1>
          <p className={styles.pageTitleExplanation}>
            Ask Questions, Get Answers with Explanations. Simple and Easy!
          </p>
        </div>
        <div className={styles.problemSection}>
          <div className={styles.questionTitleSection}>
            <h3 className={styles.titleHeader}>Title:</h3>
            <p className={styles.titleText}>
              Be Specific when writing your title. Think about it like asking it
              directly to a person.
            </p>
            <input
              type="text"
              value={title()}
              oninput={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
            />
          </div>

          <div className={styles.detailsSection}>
              <h3 className={styles.problemDetailsTitle}>
                Describe and Detail Your Problem:
              </h3>
              <p className={styles.problemDetailsText}>
                Write about things like the setting of the problem, what you have
                tried to do inorder to solve it, etc...
              </p>
              <TextArea />
              <button className={styles.postButton}>Post Question!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionPage;
