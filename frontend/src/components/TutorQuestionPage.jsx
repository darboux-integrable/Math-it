import { createSignal, Show } from "solid-js";
import styles from "./tutor-question-page.module.css";
import SideNavbar from "./SideNavbar";
import { compileText } from "./TextAreaPreview";
import TextArea from "./TextArea";
import { useParams } from "@solidjs/router";
import { getCookieValue } from "../helpers/userInSession";

export default function TutorQuestionPage() {
  const params = useParams();

  const questionId = params.questionId;

  const [user, setUser] = createSignal(false);

  const [question, setQuestion] = createSignal(false);

  const [answerText, setAnswerText] = createSignal("");
  const [toggleAnswer, setToggleAnswer] = createSignal("");

  const loadPageData = async function () {
    const questionResponse = await fetch(
      `http://127.0.0.1:5000/tutor_questions/${questionId}`
    );

    setQuestion(await questionResponse.json());

    const userResponse = await fetch(
      `http://127.0.0.1:5000/users/${getCookieValue("userID")}`
    );

    setUser(await userResponse.json());
  };

  const addAnswer = () => {
    fetch("http://127.0.0.1:5000/tutor_questions/add_answer/" + questionId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: answerText(),
        answered_by: user().username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        location.reload();
      });
  };

  loadPageData();

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <Show when={question()}>
          <div className={styles.questionSection}>
            <div className={styles.topContent}>
              <h1 className={styles.pageTitle}>{question().title}</h1>
              <h2 className={styles.userAsking}>
                Asked by <span className={styles.user}>{question().asked_by}</span>
              </h2>
            </div>
            <div className={styles.questionBody}>
              <p className={styles.questionText}>
                {compileText(question().question)}
              </p>
            </div>
          </div>
          <div className={styles.answersSection}>
            <h2 className={styles.answersTitle}>Answers</h2>
            <div className={styles.answersWrapper}>
              {question().answers.map((answer) => {
                return (<div className={styles.answer}>
                  <p className={styles.answerText}>
                    {compileText(answer.text)}
                  </p>
                  <p className={styles.answeredBy}>Answered By <span className={styles.user}>{answer.answered_by}</span></p>
                </div>);
              })}
            </div>

            <Show when={user() && user().account_type == "tutor" && user().username != question().asked_by}>
              <div className={styles.tutorAnswerSection}>
                <button
                  className={styles.addAnswer}
                  onclick={() => {
                    setToggleAnswer(!toggleAnswer());
                  }}
                >
                  Add Answer
                </button>
                <Show when={toggleAnswer()}>
                  <TextArea
                    currentText={answerText}
                    setCurrentText={setAnswerText}
                  ></TextArea>
                  <button
                    className={styles.doneButton}
                    onclick={() => {
                      addAnswer();
                    }}
                  >
                    Done
                  </button>
                </Show>
              </div>
            </Show>
          </div>
        </Show>
        {() => {
          question();
          MathJax.typeset();
        }}
      </div>
    </div>
  );
}
