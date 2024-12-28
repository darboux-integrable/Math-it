import styles from "./educator-assignments-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import downArrow from "../assets/downArrow.svg";
import { createSignal } from "solid-js";

function EducatorAssignmentPage() {
  const params = useParams();
  const classroomId = params.id;

  const assignments = [
    {
      title: "Assignment 1",
      students: [
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
      ],
    },
    {
      title: "Assignment 1",
      students: [
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
      ],
    },
    {
      title: "Assignment 1",
      students: [
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
        {
          name: "Student 1",
          completed: true,
          actual_grade: 9,
          max_grade: 10,
        },
      ],
    },
  ];

  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Course Home",
            location: `/classrooms/${classroomId}/educator/`,
          },
          {
            text: "Student Progress",
            location: `/classrooms/${classroomId}/educator/studentProgress`,
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
        <div className={styles.pageTitleWrapper}>
          <h1 className={styles.assignmentsPageTitle}>Assignments</h1>
        </div>

        <div className={styles.accordion}>
            {assignments.map((assignment) => {
              const [toggleOpen, setToggleOpen] = createSignal(false);
              return (
                <div className={styles.assignentSection}>
                  <div className={styles.assignmentTitleWrapper}>
                    <h2 className={styles.assignmentTitle}>{assignment.title}</h2>
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
                          <th className={styles.tableHeading}>Completion Status</th>
                          <th className={styles.tableHeading}>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignment.students.map((student) => {
                          return (
                            <tr
                              className={`${styles.studentRow} ${
                                (assignment.students.indexOf(student) + 1) % 2 == 0
                                  ? styles.evenRow
                                  : ""
                              }`}
                            >
                              <td className={styles.studentData}>{student.name}</td>
                              <td className={styles.studentData}>
                                {student.completed ? "Yes" : "No"}
                              </td>
                              <td className={styles.studentData}>
                                {student.completed
                                  ? student.actual_grade + "/" + student.max_grade
                                  : "-/" + student.max_grade}
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
        <div className={styles.createNewAssignmentWrapper}>
          <button className={styles.createNewAssignment} onclick={() => {location.replace(`/classrooms/${classroomId}/educator/assignments/add`)}}>New Assignment</button>
        </div>
      </div>
    </>
  );
}

export default EducatorAssignmentPage;
