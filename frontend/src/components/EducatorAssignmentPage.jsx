import styles from "./educator-assignment-page.module.css";
import { useParams } from "@solidjs/router";
import Navbar from "./Navbar";
import { createSignal, Show, createEffect, createResource } from "solid-js";
import TextAreaPreview from "./TextAreaPreview";
import NumberNavbar from "./NumberNavbar";

function EducatorAssignmentPage() {
  const params = useParams();

  const classroomId = params.id;
  const studentId = params.studentId;
  const assignmentId = params.assignmentId;

  const [totalPoints, setTotalPoints] = createSignal(0);
  const [pointsEarned, setPointsEarned] = createSignal("");

  let assignmentTitle;
  let studentName;

  const [smallestQuestionIndex, setSmallestQuestionIndex] = createSignal(0);
  const [largestQuestionIndex, setLargestQuestionIndex] = createSignal(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);

  const [currentQuestion, setCurrentQuestion] = createSignal("");
  const [currentAnswer, setCurrentAnswer] = createSignal("");

  const [error, setError] = createSignal("");

  let assignmentDetailsId;

  const [assignment, { refetch }] = createResource(async () => {
    let assignment;

    const response = await fetch(
      `http://127.0.0.1:5000/assignments/${assignmentId}/answers?student_id=${studentId}`
    );

    const data = await response.json();

    assignmentTitle = data.title;
    studentName = data.name;
    setTotalPoints(data.max_points);
    setLargestQuestionIndex(Math.min(5, data.questions.length));
    setCurrentAnswer(data.answers[0]);
    setCurrentQuestion(data.questions[0]);
    assignmentDetailsId = data.details_id;
    assignment = { questions: data.questions, answers: data.answers };

    /* I have no clue why I need to include this line. But I do. */
    /* For some reason, the inital value is not loaded in the textAreaPreview. */
    /* So I have to change it and then set it back to the original inital value. */
    /* IDFK why but this solved the problem */
    /* It also only works if the reset is delayed */
    /* again, IDFK why */
    setCurrentQuestionIndex(1);
    setTimeout(() => {
      setCurrentQuestionIndex(0);
    }, 10);

    return assignment;
  });

  const updateGrade = () => {
    fetch(`http://127.0.0.1:5000/assignments/grade/${assignmentDetailsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grade_earned: pointsEarned(),
        student_id: studentId
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        location.replace(`/classrooms/${classroomId}/educator/assignments`);
      })
      .catch((err) => {
        setError(err);
      });
  }

  createEffect(() => {
    if (assignment()) {
      setCurrentQuestion(assignment().questions[currentQuestionIndex()]);
      setCurrentAnswer(assignment().answers[currentQuestionIndex()]);
    }
  });

  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Course Home",
            location: `/classrooms/${classroomId}/educator/`,
          },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/educator/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/educator/discussions`,
          },
          {
            text: "Grades",
            location: `/classrooms/${classroomId}/educator/grades`,
          },
        ]}
        bg="dark"
      />

      <div className={styles.pageContent}>
        <Show when={assignment()}>
          <h1 className={styles.assignmentTitle}>{assignmentTitle}</h1>
          <div className={styles.assignment}>
            <div className={styles.questionWrapper}>
              <h2 className={styles.questionTitle}>Question: </h2>
              <div className={styles.questionTextWrappper}>
                <TextAreaPreview getText={currentQuestion} />
              </div>
            </div>
            <div className={styles.bottomContent}>
              <div className={styles.answerWrapper}>
                <h2 className={styles.answerTitle}>{studentName}'s Answer:</h2>
                <TextAreaPreview getText={currentAnswer} />
              </div>
              <div className={styles.questionsNavWrapper}>
                <div className={styles.navTop}>
                  <NumberNavbar
                    smallestIndex={smallestQuestionIndex}
                    setSmallestIndex={setSmallestQuestionIndex}
                    largestIndex={largestQuestionIndex}
                    setLargestIndex={setLargestQuestionIndex}
                    setCurrentIndex={setCurrentQuestionIndex}
                    maxLength={assignment().answers.length || 0}
                  />
                </div>
                <div className={styles.navBottom}>
                  <div className={styles.gradeInput}>
                    <input
                      className={styles.pointsEarnedInput}
                      type="text"
                      placeholder="-----"
                      value={pointsEarned()}
                      oninput={(e) => {
                        if (!isNaN(e.target.value)) {
                          setPointsEarned(e.target.value);
                          setError("");
                        } else {
                          setError("Grade is not a valid number.");
                        }
                      }}
                    />
                    <h2 className={styles.divideLine}>/</h2>
                    <h2 className={styles.totalPointsText}>{totalPoints()}</h2>
                  </div>

                  <button
                    className={styles.submitButton}
                    onclick={() => {
                      if (error() == "") {
                        updateGrade();
                      }
                    }}
                  >
                    Submit!
                  </button>
                </div>
              </div>
              <Show when={error() != ""}>
                <div className={styles.errorWrapper}>
                  <p className={styles.errorText}>{error()}</p>
                </div>
              </Show>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}

export default EducatorAssignmentPage;
