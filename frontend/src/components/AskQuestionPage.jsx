import { createSignal, createEffect } from "solid-js";
import styles from "./ask-question-page.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";
import tags from "../json/tags.json";
import TagListSelection from "./TagListSelection";

function AskQuestionPage() {
  const [title, setTitle] = createSignal("");
  const [tags, setTags] = createSignal([]);


  // Effect to find the current tags after filtering the array of all tags down. 

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
          </div>

          <div className={styles.tagsSection}>
            <h3 className={styles.pagDetails}>Tags:</h3>
            <p className={styles.tagsText}>
              Enter Up To 5 Tags for Your Question to Be Identified By:
            </p>
            <TagListSelection></TagListSelection>
          </div>
        </div>
        {/* <button className={styles.postButton}>Post Question!</button> */}
      </div>
    </div>
  );
}

export default AskQuestionPage;
