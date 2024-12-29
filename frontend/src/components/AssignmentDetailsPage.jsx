import { createSignal } from "solid-js";
import styles from "./assignment-details-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import { getCookieValue } from "../helpers/userInSession";
import { compileText } from "./TextAreaPreview";
import { formateDate } from "../helpers/dateFormatter";

// assignments/:id/details
function AssignmentDetailsPage() {
  const params = useParams();
  const classroomId = params.id;
  const assignmentId = params.assignmentId;
  const userId = getCookieValue("userID");

  const [assignment, setAssignment] = createSignal(false);
  const [completed, setCompleted] = createSignal(false);

  // Get Assignment Data
  fetch(`http://127.0.0.1:5000/assignments/${assignmentId}`)
    .then((res) => res.json())
    .then((data) => {
      setAssignment(data);
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
          { text: "Course Home", location: `/classrooms/${classroomId}` },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/discussions`,
          },
          { text: "Grades", location: `/classrooms/${classroomId}/grades` },
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
              {assignment().due_time}
            </p>
            <div className={styles.startButtonWrapper}>
              <button
                className={styles.startButton}
                disabled={completed()}
                onclick={() => {
                  location.replace(`/classrooms/${classroomId}/assignments/${assignmentId}`);
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
