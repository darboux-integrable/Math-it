import styles from "./student-assignment-page.module.css";
import Navbar from "./Navbar";
import { createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { getCookieValue } from "../helpers/userInSession.js";

function StudentAssignmentPage() {
  const params = useParams();
  const classroomId = params.id;
  const userId = getCookieValue("userID");

  const [assignmentLists, setAssignmentList] = createSignal([]);

  fetch(
    `http://127.0.0.1:5000/assignments/assignment_list/student/${classroomId}?student_id=${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
      setAssignmentList(data);
      
    });

  return (
    <>
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
      <div className={styles.mainContent}>
        <div className={styles.assignmentsHeader}>
          <h1 className={styles.assignmentsTitle}>Assignments</h1>
        </div>
        <div className={styles.assignmentsTableWrapper}>
          <table className={styles.assignmentsTable}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Assignment</th>
                <th className={styles.tableHeader}>Completion Status</th>
                <th className={styles.tableHeader}>Score</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {assignmentLists().map((assignment) => {
                return (
                  <tr
                    className={`${styles.assignmentRow} ${
                      (assignmentLists().indexOf(assignment) % 2) == 1
                        ? styles.evenRow
                        : ""
                    }`}
                    onclick={() => {location.replace(
                      `/classrooms/${classroomId}/assignments/${assignment.assignment_id}/description`
                    );}}
                  >
                    <td className={styles.assignmentData}>
                      {assignment.title}
                    </td>
                    <td className={styles.assignmentData}>
                      {assignment.student.completed ? "Yes" : "No"}
                    </td>
                    <td className={styles.assignmentData}>
                      {assignment.student.points_earned} /{" "}
                      {assignment.student.max_points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentAssignmentPage;
