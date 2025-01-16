import { createSignal } from "solid-js";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import styles from "./classroom-grades-page.module.css";
import { getCookieValue } from "../helpers/userInSession";

function ClassroomGradesPage({ accountType }) {
  const [grades, setGrades] = createSignal(false);

  const params = useParams();

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

    fetchGrades(currentStudent()._id);
  };

  const fetchGrades = (studentId) => {
    fetch(
      `http://127.0.0.1:5000/grades/${studentId}?classroom_id=${classroomId}`
    )
      .then((res) => res.json())
      .then((gradesArray) => {
        setGrades(gradesArray);
      });
  };

  loadClassList();

  const updateGrade = (type, newGrade, id) => {
    if (type == "assignment") {
      fetch(`http://127.0.0.1:5000/assignments/grade/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade_earned: newGrade,
          student_id: currentStudent()._id,
        }),
      }).then((res) => {
        if (res.ok) {
          // Change this to not reload the grades but just
          // notify the user with some text on the page.
          fetchGrades(currentStudent()._id);
        } else {
          alert("Error in updating grade");
        }
        return res.json();
      });
    } else if (type == "discussion") {
      fetch(
        `http://127.0.0.1:5000/discussions/update_grade/${id}?grade=${newGrade}`,
        {
          method: "PATCH",
        }
      ).then((res) => {
        // Change this to not reload the grades but just
        // notify the user with some text on the page.
        if (res.ok) {
          fetchGrades(currentStudent()._id);
        } else {
          alert("Error in updating the grade");
        }

        return res.json();
      });
    }
  };

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
            <Show when={students() && students().length > 0}>
              <h2 className={styles.studentTitle}>
                {currentStudent().first_name + " " + currentStudent().last_name}
              </h2>
              <Show when={accountType == "educator"}>
                <div className={styles.studentInput}>
                  <p className={styles.selectedOption}>
                    {currentStudent().first_name +
                      " " +
                      currentStudent().last_name}
                  </p>
                  <div className={styles.studentOptions}>
                    {students().map((student) => {
                      return (
                        <div
                          className={styles.student}
                          onclick={(e) => {
                            for (let i = 0; i < students().length; i++) {
                              if (student._id == students()[i]._id) {
                                setCurrentStudent(student);
                                fetchGrades(currentStudent()._id);
                              }
                            }
                          }}
                        >
                          <p className={styles.studentText}>
                            {student.first_name + " " + student.last_name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Show>
            </Show>
            <Show when={!students() || students().length == 0}>
              <p className={styles.noGradesText}>
                There are currently no grades
              </p>
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
                        onclick={() => {
                          updateGrade(grade.type, currentValue(), grade.id);
                        }}
                      >
                        Update
                      </button>
                      <Show when={accountType == "educator"}>
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
                      </Show>
                      <Show when={accountType == "learner"}>
                        <p className={styles.earnedGradeText}>{currentValue()}</p>
                      </Show>
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
