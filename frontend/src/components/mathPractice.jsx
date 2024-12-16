import styles from "./math-practice.module.css";
import SubjectBox from "./SubjectBox";
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";
import { Show } from "solid-js";

let subjects = subjectsJSON.subjects;

function MathPractice() {
  return (
    <div className={styles.wrapper}>
      <Show when={window.innerWidth > 720}>
        <SideNavbar />
      </Show>

      <div
        className={styles.pageContent}
        style={{ "margin-left": window.innerWidth > 720 ? "75px" : "0px" }}
      >
        <div className={styles.subjectBoxes}>
          {subjects.map((subject) => {
            return (
              <SubjectBox
                title={subject.subject}
                description={subject.description}
                topics={subject.topics}
                color={subject.color1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MathPractice;
