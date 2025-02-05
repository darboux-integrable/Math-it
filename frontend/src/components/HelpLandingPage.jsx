import { createSignal , Show } from "solid-js";
import { getCookieValue } from "../helpers/userInSession";
import styles from "./help-landing-page.module.css";
import SideNavbar from "./SideNavbar";
import { compileText } from "./TextAreaPreview";

export default function HelpLandingPage() {
  let [user, setUser] = createSignal({});

  const [askedQuestions, setAskedQuestions] = createSignal([]);

  const [receivedQuestions, setReceivedQuestions] = createSignal([]);

  const loadPageData = async function () {
    const userResponse = await fetch(
      `http://127.0.0.1:5000/users/${getCookieValue("userID")}`
    );

    setUser(await userResponse.json());

    const askedQuestionsResponse = await fetch(
      "http://127.0.0.1:5000/tutor_questions/all_questions/" + user().username
    );

    setAskedQuestions(await askedQuestionsResponse.json());

    if (user().account_type == "tutor") {
      const receivedQuestionsResponse = await fetch(
        "http://127.0.0.1:5000/tutor_questions/received_questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: user().tutor_questions,
          }),
        }
      );

      setReceivedQuestions(await receivedQuestionsResponse.json());
    }
  };

  loadPageData();

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Tutor Help</h1>

        <h2 className={styles.sectionTitle}>Questions You Asked</h2>
        <div className={styles.askedSection}>
          {askedQuestions().map((question) => {
            return (
              <div
                className={styles.question}
                onclick={() => {
                  location.replace(`/help/questions/${question._id}`);
                }}
              >
                <div className={styles.questionTop}>
                  <h2 className={styles.questionTitle}>{question.title}</h2>
                  <div
                    className={`${styles.numAnswersWrapper} ${
                      question.answers.length > 0 ? styles.answered : ""
                    }`}
                  >
                    <p className={styles.numAnswersText}>
                      {question.answers.length} Answers
                    </p>
                  </div>
                </div>
                <div className={styles.questionBottom}>
                  <p className={styles.questionText}>
                    {compileText(question.question)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Show when={user() && user().account_type == "tutor"}>
            <h2 className={styles.sectionTitle}>Questions You Recieved</h2>
            <div className={styles.askedSection}>
              {receivedQuestions().map((question) => {
                return (
                  <div className={styles.question} onclick={() => {
                    location.replace(`/help/questions/${question._id}`)
                  }}>
                    <div className={styles.questionTop}>
                      <h2 className={styles.questionTitle}>{question.title}</h2>
                      <div
                        className={`${styles.numAnswersWrapper} ${
                          question.answers.length > 0 ? styles.answered : ""
                        }`}
                      >
                        <p className={styles.numAnswersText}>
                          {question.answers.length} Answers
                        </p>
                      </div>
                    </div>
                    <div className={styles.questionBottom}>
                      <p className={styles.questionText}>
                        {compileText(question.question)}
                      </p>
                      <p className={styles.userAsking}>
                        Asked By {question.asked_by}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
        </Show>
      </div>
      {() => {
        askedQuestions();
        receivedQuestions();
        MathJax.typeset();
      }}
    </div>
  );
}
