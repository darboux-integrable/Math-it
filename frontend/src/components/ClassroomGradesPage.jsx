import { createSignal } from "solid-js";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import styles from "./classroom-grades-page.module.css";
import { getCookieValue } from "../helpers/userInSession";

function ClassroomGradesPage({ accountType }) {
  const [grades, setGrades] = createSignal(false);

  const params = useParams();

  const userId = getCookieValue("userID");

  const classroomId = params.id;

  let classroom;

  const [students, setStudents] = createSignal(false);
  const [currentStudent, setCurrentStudent] = createSignal("");

  const loadClassList = async () => {
    // Fetch the classroom which contains a list of student ids
    let classroomFetch = await fetch(
      `http://127.0.0.1:5000/classrooms/${classroomId}`
    );

    let classroomResponse = await classroomFetch.json();

    classroom = classroomResponse;

    // Fetch the class list which returns an array of the student objects based on the IDS.
    let classListFetch = await fetch(
      `http://127.0.0.1:5000/classrooms/class_list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_ids: classroom.students,
        }),
      }
    );

    setStudents(await classListFetch.json());
    setCurrentStudent(students()[0]);

    console.log(students());
  };

  loadClassList();

  const fetchGrades = (studentId) => {
    fetch(`http://127.0.0.1:5000/grades/${studentId}`)
      .then((res) => res.json())
      .then((gradesArray) => {
        setGrades(gradesArray);
      });
  };

  fetchGrades("6763836950a23b4aa10f3f21");

  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Course Home",
            location: `/classrooms/${classroomId}/${accountType}`,
          },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/${accountType}/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/${accountType}/discussions`,
          },
          {
            text: "Grades",
            location: `/classrooms/${classroomId}/${accountType}/grades`,
          },
        ]}
        bg="dark"
      />

      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Grades</h1>
        <div className={styles.gradesWrapper}>
          <div className={styles.studentWrapper}>
            <Show when={students()}>
              <h2 className={styles.studentTitle}>{currentStudent().first_name + " " + currentStudent().last_name}</h2>
              <div className={styles.studentInput}>
                <p className={styles.selectedOption}>Adam Evans</p>
                <div className={styles.studentOptions}>
                  {students().map((student) => {
                    return (
                      <div className={styles.student} onclick={(e) => {
                        
                        for(let i = 0; i < students().length; i++){
                            if(student._id == students()[i]._id){
                                setCurrentStudent(student);
                            }
                        }

                      }} >
                        <p className={styles.studentText}>
                          {student.first_name + " " + student.last_name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Show>
          </div>
          <div className={styles.gradesTable}>
            <Show when={grades()}>
              {grades().map((grade) => {
                const initialValue = grade.points_earned;

                const [currentValue, setCurrentValue] =
                  createSignal(initialValue);

                return (
                  <div className={styles.grade}>
                    <h3 className={styles.gradeTitle}>{grade.title}</h3>
                    <div className={styles.gradeDisplay}>
                      <button
                        className={`${styles.updateGradeButton} ${
                          currentValue() != initialValue
                            ? styles.updatedGrade
                            : ""
                        }`}
                      >
                        Update
                      </button>
                      <input
                        type="text"
                        value={currentValue()}
                        oninput={(e) => {
                          if (!isNaN(e.target.value)) {
                            setCurrentValue(e.target.value);
                          }
                        }}
                        className={styles.gradeInput}
                      />
                      <p className={styles.divideLine}>/</p>
                      <p className={styles.maxGrade}>{grade.max_points}</p>
                    </div>
                  </div>
                );
              })}
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassroomGradesPage;
