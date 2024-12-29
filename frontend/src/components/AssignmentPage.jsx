import { createSignal, createEffect } from "solid-js";
import styles from "./assignment-page.module.css";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import TextAreaPreview from "./TextAreaPreview";
import { getCookieValue } from "../helpers/userInSession";

function AssignmentPage() {
  const params = useParams();
  const assignmentId = params.assignmentId;
  const classroomId = params.id;
  const userId = getCookieValue("userID");

  const [smallestQuestionIndex, setSmallestQuestionIndex] = createSignal(0);
  const [largestQuestionIndex, setLargestQuestionIndex] = createSignal(0);
  const [questionIndex, setQuestionIndex] = createSignal(0);

  const [currentQuestionText, setCurrentQuestionText] = createSignal("");
  const [currentAnswerText, setCurrentAnswerText] = createSignal("");
  const [assignmentTitle, setAssignmentTitle] = createSignal("");
  const [questions, setQuestions] = createSignal([]);
  let answers = [];

  let questionText;

  fetch(
    `http://127.0.0.1:5000/assignments/check_completed/${assignmentId}?student_id=${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.completed)
        location.replace(
          `/classrooms/${classroomId}/assignments/${assignmentId}/description`
        );
    });

  fetch(
    `http://127.0.0.1:5000/assignments/assignment_questions/${assignmentId}`
  )
    .then((res) => res.json())
    .then((data) => {
      setAssignmentTitle(data.title);
      setQuestions(data.questions);
      setCurrentQuestionText(questions()[0]);
      setLargestQuestionIndex(Math.min(questions().length, 5));

      // Load Blank Answers
      for (let i = 0; i < questions().length; i++) {
        answers.push("");
      }
    });

  const submitQuiz = () => {
    fetch(
      `http://127.0.0.1:5000/assignments/submit/${assignmentId}?student_id=${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ answers }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        location.replace(
          `/classrooms/${classroomId}/assignments/${assignmentId}/description`
        );
      });
  };

  return (
    <div className={styles.pageContent}>
      <h1 className={styles.pageTitle}>{assignmentTitle()}</h1>

      <Show when={questions()}>
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>Question</h2>
          <div ref={questionText} className={styles.questionText}>
            <TextAreaPreview getText={currentQuestionText} />
          </div>
        </div>

        <div className={styles.answerSection}>
          <h2 className={styles.answerTitle}>Answer</h2>
          <TextArea
            currentText={currentAnswerText}
            setCurrentText={setCurrentAnswerText}
          />
          <div className={styles.questionsNavWrapper}>
            <div className={styles.questionsNav}>
              <Show when={smallestQuestionIndex() != 0}>
                <div
                  className={`${styles.questionNavButton} ${styles.backButton}`}
                  onclick={() => {
                    setLargestQuestionIndex(largestQuestionIndex() - 1);
                    setSmallestQuestionIndex(smallestQuestionIndex() - 1);
                  }}
                >
                  Back
                </div>
              </Show>
              {() => {
                let navButtons = [];
                for (
                  let i = smallestQuestionIndex();
                  i < largestQuestionIndex();
                  i++
                ) {
                  navButtons.push(
                    <div
                      className={styles.questionNavButton}
                      onclick={(e) => {
                        const index = parseInt(e.target.innerText) - 1;

                        answers[questionIndex()] = currentAnswerText();

                        setCurrentAnswerText(answers[index]);
                        setCurrentQuestionText(questions()[index]);
                        setQuestionIndex(index);
                      }}
                    >
                      {i + 1}
                    </div>
                  );
                }
                return navButtons;
              }}
              <Show when={largestQuestionIndex() != questions().length}>
                <div
                  className={`${styles.questionNavButton} ${styles.forwardButton}`}
                  onclick={() => {
                    setLargestQuestionIndex(largestQuestionIndex() + 1);
                    setSmallestQuestionIndex(smallestQuestionIndex() + 1);
                  }}
                >
                  Forward
                </div>
              </Show>
            </div>
            <button
              className={styles.submitButton}
              onclick={() => {
                answers[questionIndex()] = currentAnswerText();
                submitQuiz();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default AssignmentPage;
