import { createSignal, createEffect, createResource } from "solid-js";
import styles from "./assignment-page.module.css";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import TextAreaPreview, { compileText } from "./TextAreaPreview";
import { getCookieValue } from "../helpers/userInSession";
import NumberNavbar from "./NumberNavbar";

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
  let answers = [];

  let prevQuestionIndex = 0;

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

  const [questions, { refetch }] = createResource(async () => {
    let questionsTemp;

    const response = await fetch(
      `http://127.0.0.1:5000/assignments/assignment_questions/${assignmentId}`
    );

    const data = await response.json();

    questionsTemp = data.questions;
    setAssignmentTitle(data.title);
    setCurrentQuestionText(questionsTemp[0]);
    setLargestQuestionIndex(Math.min(data.questions.length, 5));

    // Load Blank Answers
    for (let i = 0; i < questionsTemp.length; i++) {
      answers.push("");
    }

    /* I have no clue why I need to include this line. But I do. */
    /* For some reason, the inital value is not loaded in the textAreaPreview. */
    /* So I have to change it and then set it back to the original inital value. */
    /* IDFK why but this solved the problem */
    /* It also only works if the reset is delayed */
    /* again, IDFK why */
    setQuestionIndex(1);
    setTimeout(() => {
      setQuestionIndex(0);
    }, 10);

    return questionsTemp;
  });

  createEffect(() => {
    if (questions()) {
      setCurrentQuestionText(questions()[questionIndex()]);
      answers[prevQuestionIndex] = currentAnswerText();

      setCurrentAnswerText(answers[questionIndex()]);

      prevQuestionIndex = questionIndex();
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
            <NumberNavbar
              smallestIndex={smallestQuestionIndex}
              setSmallestIndex={setSmallestQuestionIndex}
              largestIndex={largestQuestionIndex}
              setLargestIndex={setLargestQuestionIndex}
              setCurrentIndex={setQuestionIndex}
              maxLength={questions().length}
            />
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
