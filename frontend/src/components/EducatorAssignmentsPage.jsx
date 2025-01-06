import styles from "./educator-assignments-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import downArrow from "../assets/downArrow.svg";
import { createSignal } from "solid-js";

function EducatorAssignmentsPage() {
  const params = useParams();
  const classroomId = params.id;

  const [assignments, setAssignments] = createSignal(false);

  fetch("http://127.0.0.1:5000/assignments/assignment_list/" + classroomId)
    .then((res) => res.json())
    .then((data) => {
      setAssignments(
        data.map((dataPiece) => {
          return {
            title: dataPiece.title,
            id: dataPiece.id,
            students: dataPiece.details.students,
          };
        })
      );
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

      <div className={styles.mainContent}>
        <div className={styles.pagesTitleWrapper}>
          <h1 className={styles.assignmentsPageTitle}>Assignments</h1>
        </div>
        <Show when={assignments()}>
          <div className={styles.accordion}>
            {assignments().map((assignment) => {
              const [toggleOpen, setToggleOpen] = createSignal(false);
              return (
                <div className={styles.assignentSection}>
                  <div className={styles.assignmentTitleWrapper}>
                    <h2 className={styles.assignmentTitle}>
                      {assignment.title}
                    </h2>
                    <img
                      onclick={() => {
                        setToggleOpen(!toggleOpen());
                      }}
                      src={downArrow}
                      className={`${styles.downArrow} ${
                        toggleOpen() ? styles.upArrow : " "
                      }`}
                      alt="Close Assignment Arrow"
                    />
                  </div>
                  <div
                    className={`${styles.assignmentStudents} ${
                      !toggleOpen() ? styles.close : " "
                    }`}
                  >
                    <table className={styles.studentTable}>
                      <thead>
                        <tr>
                          <th className={styles.tableHeading}>Student</th>
                          <th className={styles.tableHeading}>
                            Completion Status
                          </th>
                          <th className={styles.tableHeading}>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignment.students.map((student) => {
                          return (
                            <tr
                              className={`${styles.studentRow} ${
                                (assignment.students.indexOf(student) + 1) %
                                  2 ==
                                0
                                  ? styles.evenRow
                                  : ""
                              } ${student.completed ? styles.completed : ""}`}
                              onclick={() => {
                                location.replace(
                                  `/classrooms/${classroomId}/educator/assignments/${assignment.id}/${student.id}`
                                );
                              }}
                            >
                              <td className={styles.studentData}>
                                {student.name}
                              </td>
                              <td className={styles.studentData}>
                                {student.completed
                                  ? "Completed"
                                  : "Not Completed"}
                              </td>
                              <td className={styles.studentData}>
                                {student.points_earned} / {student.max_points}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </Show>
        <div className={styles.createNewAssignmentWrapper}>
          <button
            className={styles.createNewAssignment}
            onclick={() => {
              location.replace(
                `/classrooms/${classroomId}/educator/assignments/add`
              );
            }}
          >
            New Assignment
          </button>
        </div>
      </div>
    </>
  );
}

export default EducatorAssignmentsPage;
