import styles from "./math-practice.module.css";
import SubjectBox from "./SubjectBox";
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";
import { Show } from "solid-js";
import { createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";

let subjects = subjectsJSON.subjects;

function MathPractice() {
  const [topics, setTopics] = createSignal([]);
  const [numberOfQuestions, setNumberOfQuestions] = createSignal(10);

  return (
    <div className={styles.wrapper}>
      <Show when={window.innerWidth > 720}>
        <SideNavbar />
      </Show>

      <div
        className={styles.pageContent}
        style={{ "margin-left": window.innerWidth > 720 ? "75px" : "0px" }}
      >
        <div className={styles.doneButtonWrapper}>
          <div >
            <p className={styles.numberOfQuestionsLabel}>Number Of Questions</p>
            <input
              type="number"
              className={styles.numberOfQuestionsInput}
              value={numberOfQuestions()}
              oninput={(e) => setNumberOfQuestions(e.target.value)}
              placeholder="Number of Questions"
              min={5}
            />
          </div>
          <div className={styles.navButtons}>
            <button
              className={styles.doneButton}
              onclick={() => {
                const topicsStr = JSON.stringify(topics());
                location.replace(
                  `/practice/problems?ids=${topicsStr.substring(
                    1,
                    topicsStr.length - 1
                  )}&numQuestions=${numberOfQuestions()}`
                );
              }}
            >
              Go!
            </button>
            <button className={styles.doneButton} onclick={() => {
              location.replace("/practice/help");
            }}>Get Help</button>
          </div>
        </div>
        <div className={styles.subjectBoxes}>
          {subjects.map((subject) => {
            return (
              <SubjectBox
                titlectBox
                title={subject.subject}
                description={subject.description}
                topics={subject.topics}
                color={subject.color1}
                setTopics={setTopics}
                getTopics={topics}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MathPractice;
