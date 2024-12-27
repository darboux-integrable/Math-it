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
      <div className={styles.assignmentsHeader}>
        <h1 className={styles.assignmentsTitle}>Assignments</h1>
        <select>
          <option value="10">10 Per Page</option>
          <option value="20">20 Per Page</option>
          <option value="50">50 Per Page</option>
          <option value="100">100 Per Page</option>
        </select>
      </div>

      <div className={styles.assignmentsTableWrapper}>
        <table className={styles.assignmentsTable}>
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Completion Status</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default StudentAssignmentPage;
