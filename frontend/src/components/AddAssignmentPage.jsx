import styles from "./add-assignment-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import { createSignal, Show } from "solid-js";
import subjectsJSON from "../json/subjects.json";
import downArrow from "../assets/downArrow.svg";

function AddAssignmentPage() {
  const subjects = subjectsJSON.subjects;
  
  let topics = []
  subjects.forEach(subject => {
    subject.topics.forEach(topic => {
        const [count, setCount] = createSignal(0);
        topics.push({name: topic, color: subject.color1, count, setCount})
    })
  })

  const params = useParams();

  const classroomId = params.id;

  const [yourOwnProblems, setYourOwnProblems] = createSignal([]);
  const [currentProblemText, setCurrentProblemText] = createSignal("");

  const [assignmentDescription, setAssignmentDescription] = createSignal("");
  const [assignmentTitle, setAssignmentTitle] = createSignal("");

  const [toggleGenerateProblems, setToggleGenerateProblems] =
    createSignal(false);
  const [toggleYourOwnProblems, setToggleYourOwnProblems] = createSignal(false);

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

                <div className={styles.ownProblemNotice}>
                  Problems Created by you, the educator, will not auto grade.
                  They must be graded individually by you.
                </div>

                <button className={styles.problemButton}>Add Problem</button>
              </div>
            </Show>

            <div className={styles.bottomButtons}>
                <button className={styles.previewAssignmentButton}>
                  Preview Assignment
                </button>
                <button className={styles.addAssignmentButton}>
                  Create Assignment
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAssignmentPage;
