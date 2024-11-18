import styles from "./math-practice.module.css";
import SubjectBox from "./SubjectBox";
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";

let subjects = subjectsJSON.subjects;

function MathPractice(){

      return (
        <div className={styles.wrapper}>
          <SideNavbar />
          <div className={styles.pageContent}>

          <div className={styles.subjectBoxes}>
            {subjects.map(subject => {
                return (
                  <SubjectBox title={subject.subject} description={subject.description} topics={subject.topics} />
                )
            })}
          </div>

          </div>
        </div>
      );
}

export default MathPractice;