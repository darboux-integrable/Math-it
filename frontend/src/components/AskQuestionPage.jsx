import { createSignal, createEffect } from "solid-js";
import styles from "./ask-question-page.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";
import TagListSelection from "./TagListSelection";
import { getCookieValue } from "../helpers/userInSession";
import { formateDate } from "../helpers/dateFormatter";
import checkFilled from "../helpers/checkForFilledInputs";

function AskQuestionPage() {
  let user;

  fetch(`http://127.0.0.1:5000/users/${getCookieValue("userID")}`)
    .then((res) => res.json())
    .then((data) => {
      user = data;
    });

  let newTags = []

  const [title, setTitle] = createSignal("");

  const [questionText, setQuestionText] = createSignal("");
  const [tags, setTags] = createSignal([]);

  const [error, setError] = createSignal("");

  const addQuestion = () => {
    const date = new Date();

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const askDate = formateDate(`${year}-${month}-${day}`);

    fetch("http://127.0.0.1:5000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title(),
        text: questionText(),
        tags: tags(),
        user_asking: user.username,
        ask_date: askDate,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        addNewTags();
        location.replace("/questions/" + data.id);
      })
  };

  const addNewTags = () => {
    fetch("http://127.0.0.1:5000/tags/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        names: newTags
      })
    })
    .then(res => res.json())
    .then(() => {})
  }

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContainer}>
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
                Be Specific when writing your title. Think about it like asking
                it directly to a person.
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
                Write about things like the setting of the problem, what you
                have tried to do inorder to solve it, etc...
              </p>
              <TextArea
                currentText={questionText}
                setCurrentText={setQuestionText}
              />
            </div>
            <div className={styles.tagsSection}>
              <h3 className={styles.tagsTitle}>Tags:</h3>
              <p className={styles.tagsText}>
                Enter Up To 5 Tags for Your Question to Be Identified By:
              </p>
              <TagListSelection newTags={newTags} selectedTags={tags} setSelectedTags={setTags} />
            </div>
          </div>
          <div className={styles.postButtonWrapper}>
            <button className={styles.postButton} onclick={() => {
              if(checkFilled(title(), questionText()) && tags().length > 0){
                addQuestion();
              } else {
                setError("Not All Inputs are Filled.");
              }
            }} >Post Question!</button>
          </div>
          <p className={styles.errorText}>{error()}</p>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionPage;
