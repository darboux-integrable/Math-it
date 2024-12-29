import styles from "./add-assignment-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import { createSignal, Show } from "solid-js";
import subjectsJSON from "../json/subjects.json";
import downArrow from "../assets/downArrow.svg";
import { compileText } from "./TextAreaPreview";
import { formateTime, formateDate } from "../helpers/dateFormatter";
import checkFilled from "../helpers/checkForFilledInputs.js";

function AddAssignmentPage() {
  const params = useParams();

  const classroomId = params.id;

  let classroom;

  fetch(`http://127.0.0.1:5000/classrooms/${classroomId}`)
    .then((res) => res.json())
    .then((data) => {
      classroom = data;
    });

  const subjects = subjectsJSON.subjects;

  let topics = [];
  subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
      const [count, setCount] = createSignal(0);
      topics.push({
        name: topic.name,
        color: subject.color1,
        count,
        setCount,
        id: topic.id,
      });
    });
  });

  const [error, setError] = createSignal("");

  const [assignmentDueDate, setAssignmentDueDate] = createSignal("");
  const [assignmentDueTime, setAssignmentDueTime] = createSignal("");
  const [assignmentDescription, setAssignmentDescription] = createSignal("");
  const [assignmentTitle, setAssignmentTitle] = createSignal("");

  const [assignmentPoints, setAssignmentPoints] = createSignal(10);

  const [toggleGenerateProblems, setToggleGenerateProblems] =
    createSignal(false);
  const [toggleYourOwnProblems, setToggleYourOwnProblems] = createSignal(false);
  const [toggleLoadPreview, setToggleLoadPreview] = createSignal(false);

  const [generatedEquations, setGeneratedEquations] = createSignal([]);

  const [yourOwnProblems, setYourOwnProblems] = createSignal([]);
  const [currentProblemText, setCurrentProblemText] = createSignal("");

  const createAssignment = () => {
    const timeSplit = assignmentDueTime().split(":");
    const hours = timeSplit[0];
    const minutes = timeSplit[1];

    fetch(`http://127.0.0.1:5000/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        title: assignmentTitle(),
        class_id: classroomId,
        period: classroom.period,
        teacher: classroom.teacher,
        due_date: assignmentDueDate(),
        due_time: formateTime(hours, minutes),
        total_points: "" + String(assignmentPoints()),
        questions: [
          ...generatedEquations().map((question) => question.mathjax),
          ...yourOwnProblems(),
        ],
        student_ids: classroom.students,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        sendNotification();
      });
  };

  const sendNotification = () => {
    const date = new Date();
    const minutes = date.getMinutes();

    const minutesFormat = minutes < 10 ? "0" + minutes : minutes;

    fetch(`http://127.0.0.1:5000/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        type: "assignment",
        title: assignmentTitle(),
        timestamp: formateTime(date.getHours(), minutesFormat),
        recipients: classroom.students,
        class_name: classroom.title,
        teacher: classroom.teacher,
        due_date: formateDate(assignmentDueDate()),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      });
  };

  const generateProblemSet = () => {
    const selectedTopics = topics.filter((topic) => topic.count() > 0);

    const selectedIds = selectedTopics.map((topic) => topic.id);
    const problemNumbers = selectedTopics.map((topic) => topic.count());

    fetch("http://127.0.0.1:5000/math/problem_set", {
      method: "POST",
      headers: {
        "Content-type": "Application/JSON",
      },
      body: JSON.stringify({
        topic_ids: selectedIds,
        question_numbers: problemNumbers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGeneratedEquations(data);
      });
  };

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

      <div className={styles.addAssignmentSection}>
        <div className={styles.pageTitleWrapper}>
          <h1 className={styles.pageTitle}>Add Assignment</h1>
        </div>

        <div className={styles.assignmentInfoWrapper}>
          <div className={styles.basicInfo}>
            <div className={styles.assignmentInfo}>
              <p className={styles.assignmentInfoTitle}>Title</p>
              <input
                type="text"
                className={styles.assignmentInfoInput}
                placeholder="Enter Assignment title"
                oninput={(e) => {
                  setAssignmentTitle(e.target.value);
                }}
                value={assignmentTitle()}
              />
            </div>
            <div className={styles.assignmentInfo}>
              <p className={styles.assignmentInfoTitle}>Total Points</p>
              <input
                type="number"
                className={styles.assignmentInfoInput}
                placeholder="Enter the number of points for the assignment"
                oninput={(e) => {
                  setAssignmentPoints(e.target.value);
                }}
                value={assignmentPoints()}
              />
            </div>
            <div className={styles.assignmentInfo}>
              <p className={styles.assignmentInfoTitle}>Due Date</p>
              <input
                type="date"
                className={styles.assignmentInfoInput}
                placeholder="Enter Assignment Due Date"
                oninput={(e) => {
                  setAssignmentDueDate(e.target.value);
                }}
                value={assignmentDueDate()}
              />
            </div>
            <div className={styles.assignmentInfo}>
              <p className={styles.assignmentInfoTitle}>Due Time</p>
              <input
                type="time"
                className={styles.assignmentInfoInput}
                placeholder="Enter Assignment Due Time"
                oninput={(e) => {
                  setAssignmentDueTime(e.target.value);
                }}
                value={assignmentDueTime()}
              />
            </div>
          </div>

          <div className={styles.assignmentInfo}>
            <p className={styles.assignmentInfoTitle}>Description</p>
            <div className={styles.textAreaPadding}>
              <TextArea
                currentText={assignmentDescription}
                setCurrentText={setAssignmentDescription}
              />
            </div>
          </div>

          <div className={styles.assignmentInfoSection}>
            <div className={styles.problemButtons}>
              <button
                className={`${styles.generateProblemsButton} ${styles.problemButton}`}
                onclick={() => {
                  setToggleGenerateProblems(!toggleGenerateProblems());
                }}
              >
                Generate Problems
              </button>
              <button
                className={`${styles.addYourOwnProblemsButton} ${styles.problemButton}`}
                onclick={() =>
                  setToggleYourOwnProblems(!toggleYourOwnProblems())
                }
              >
                Add Your Own
              </button>
            </div>

            <Show when={toggleGenerateProblems()}>
              <div className={styles.generateProblemsWrapper}>
                <h1 className={styles.generateProblemsTitle}>
                  Pull Problems From:
                </h1>
                <div className={styles.topicButtons}>
                  {topics.map((topic) => {
                    return (
                      <div
                        className={styles.problemTopicWrapper}
                        style={{
                          "animation-delay": topics.indexOf(topic) * 100 + "ms",
                        }}
                      >
                        <div className={styles.topicNameWrapper}>
                          <p className={styles.topicName}>{topic.name}</p>
                        </div>

                        <div className={styles.topicCounterWrapper}>
                          <img
                            className={styles.increaseCount}
                            src={downArrow}
                            onclick={() => {
                              topic.setCount(topic.count() + 1);
                            }}
                          ></img>
                          <p className={styles.topicCount}>{topic.count()}</p>
                          <img
                            className={styles.decreaseCount}
                            src={downArrow}
                            onclick={() => {
                              if (topic.count() - 1 >= 0) {
                                topic.setCount(topic.count() - 1);
                              }
                            }}
                          ></img>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className={styles.generateProblemSetButton}
                  onclick={() => {
                    generateProblemSet();
                  }}
                >
                  Generate Problems
                </button>
              </div>
            </Show>

            <Show when={toggleYourOwnProblems()}>
              <h1 className={styles.makeYourOwnProblemTitle}>
                Make Your Own Problem
              </h1>
              <div className={styles.ownProblemWrapper}>
                <div className={styles.assignmentInfo}>
                  <p className={styles.assignmentInfoTitle}>Problem</p>
                  <div className={styles.textAreaPadding}>
                    <TextArea
                      currentText={currentProblemText}
                      setCurrentText={setCurrentProblemText}
                    />
                  </div>
                </div>

                <button
                  className={styles.problemButton}
                  onclick={() => {
                    if(checkFilled(currentProblemText())){
                      setYourOwnProblems([
                        ...yourOwnProblems(),
                        currentProblemText(),
                      ]);
                      setCurrentProblemText("");
                    } else {
                      setError("Please enter a question.")
                    }

                  }}
                >
                  Add Problem
                </button>

                <Show when={error() == "Please enter a question."}>
                  <p className={styles.error}>{error()}</p>
                </Show>
              </div>
            </Show>

            <div className={styles.bottomButtons}>
              <button
                className={styles.previewAssignmentButton}
                onclick={() => {
                  setToggleLoadPreview(!toggleLoadPreview());
                }}
              >
                Preview Problems
              </button>

              <Show when={toggleLoadPreview()}>
                <div className={styles.generatedQuestionsWrapper}>
                  {generatedEquations().map((equation) => {
                    return (
                      <div className={styles.questionWrapper}>
                        <p className={styles.mathEquationText}>
                          {equation.mathjax}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.yourOwnQuestionsWrapper}>
                  {yourOwnProblems().map((problem) => {
                    return (
                      <div className={styles.yourOwnQuestionWrapper}>
                        <p className={styles.mathEquationText}>
                          {compileText(problem)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Show>

              <div className={styles.ownProblemNotice}>
                Please note that all problems must be graded by you the
                educator, no problems will auto grade.
              </div>
              <button
                className={styles.addAssignmentButton}
                onclick={() => {
                  if (
                    checkFilled(
                      assignmentTitle(),
                      String(assignmentPoints()),
                      assignmentDueDate(),
                      assignmentDueTime(),
                      assignmentDescription()
                    ) &&
                    (generatedEquations().length > 0 ||
                      yourOwnProblems().length > 0)
                  ) {
                    createAssignment();
                  } else {
                    setError("Error: Not all inputs have been filled. Please fill in the empty inputs.")
                  }
                }}
              >
                Create Assignment
              </button>
            </div>
                <Show when={error() == "Error: Not all inputs have been filled. Please fill in the empty inputs."}>
                  <p className={styles.error}>{error()}</p>
                </Show>

            {() => {
              toggleLoadPreview();
              generatedEquations();
              MathJax.typeset();
            }}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAssignmentPage;
