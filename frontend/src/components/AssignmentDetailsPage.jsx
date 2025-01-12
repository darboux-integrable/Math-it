import { createSignal } from "solid-js";
import styles from "./assignment-details-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import { getCookieValue } from "../helpers/userInSession";
import { compileText } from "./TextAreaPreview";
import { formateDate, formateTime } from "../helpers/dateFormatter";

// assignments/:id/details
function AssignmentDetailsPage() {
  const params = useParams();
  const classroomId = params.id;
  const assignmentId = params.assignmentId;
  const userId = getCookieValue("userID");

  const [assignment, setAssignment] = createSignal(false);
  const [completed, setCompleted] = createSignal(false);

  const [hours, setHours] = createSignal(0);
  const [minutes, setMinutes] = createSignal(0);

  // Get Assignment Data
  fetch(`http://127.0.0.1:5000/assignments/${assignmentId}`)
    .then((res) => res.json())
    .then((data) => {
      setAssignment(data);
      setHours(data.due_time.split(":")[0]);
      setMinutes(parseInt(data.due_time.split(":")[1]));
    });

  // See if the user has completed the assignment already.
  fetch(
    `http://127.0.0.1:5000/assignments/check_completed/${assignmentId}?student_id=${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
      setCompleted(data.completed);
    });

  return (
    <div className={styles.page}>
      <Navbar
        bg="dark"
        buttons={[
          { text: "Course Home", location: `/classrooms/${classroomId}/learner` },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/learner/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/learner/discussions`,
          },
          { text: "Grades", location: `/classrooms/${classroomId}/learner/grades` },
        ]}
      />

      <div className={styles.pageContent}>
        <Show when={assignment()}>
          <div>
            <h1 className={styles.assignmentTitle}>{assignment().title}</h1>
            <p className={styles.assignmentDescription}>
              {compileText(assignment().description)}
            </p>
          </div>

          <div className={styles.bottomContent}>
            <p className={styles.dueDate}>
              Due: {formateDate(assignment().due_date)} at{" "}
              {formateTime(hours(), minutes())}
            </p>
            <div className={styles.startButtonWrapper}>
              <button
                className={styles.startButton}
                disabled={completed()}
                onclick={() => {
                  location.replace(`/classrooms/${classroomId}/learner/assignments/${assignmentId}`);
                }}
              >
                Start
              </button>
              <Show when={completed()}>
                <h2 className={styles.completedTitle}>Assignment Already Completed</h2>
              </Show>
            </div>
          </div>
        </Show>

        {/* Load Mathjax after the assignment loads */}
        {() => {
          assignment();
          MathJax.typeset();
        }}
      </div>
    </div>
  );
}

export default AssignmentDetailsPage;
