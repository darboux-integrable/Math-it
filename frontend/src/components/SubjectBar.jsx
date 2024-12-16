import { createSignal } from "solid-js";
import styles from "./subject-bar.module.css";
import { Show } from "solid-js";

function SubjectBar({ subject, delay, color1, subjectsArray, setSubjectsArray}) {
  
  // Used to toggle if the SubjectBar is selected
  const [selected, setSelected] = createSignal(false);

  // Used to determine if the scaling animation is complete
  const [timePassed, setTimePassed] = createSignal(false);
  
  // The animation last 300ms and each SubjectBar has a delay. 
  setTimeout(() => {
    setTimePassed(true);
  }, delay + 300);

  // Function to prefrom each time the SubjectBar is clicked 
  const toggleSelected = (e) => {
    if (!selected()) {
      setSelected(true);
      // Add the subject from this subjectBar to the array of all the selected subjects
      setSubjectsArray([...subjectsArray(), subject]);
    }
    else {
      setSelected(false);
      // Remove the subject from this subjectBar from the array of all the selected subjects.
      setSubjectsArray(subjectsArray().filter(subjectName => subjectName != subject));
    };
  };

  return (
    <div className={styles.wrapper}>

        {/* Show Gradient Background only after the tag has fully scaled up */}
      <Show when={timePassed()}>
        <div
          className={styles.borderBox}
          style={{
            "background-image": `linear-gradient(45deg, ${color1}, ${color1})`,
            "animation-delay": delay + "ms",
          }}
        ></div>
      </Show>
      
      <div
        className={styles.subjectBar}
        class={selected() ? styles.selectedSubject : " "}
        onclick={(e) => {
          toggleSelected(e);
        }}
        style={{ "animation-delay": delay + "ms" }}
      >
        <div
          className={styles.colorBox}
          style={{
            "background-image": `linear-gradient(45deg, ${color1}, ${color1})`,
          }}
        ></div>
        <div className={styles.subjectTextWrapper}>
          <p className={styles.subjectText}>{subject}</p>
        </div>
      </div>
    </div>
  );
}

export default SubjectBar;
