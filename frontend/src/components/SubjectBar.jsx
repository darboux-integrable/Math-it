import { createSignal } from "solid-js";
import styles from "./subject-bar.module.css";
import { Show } from "solid-js";

function SubjectBar({ subject, delay, color1 }) {
  const [selected, setSelected] = createSignal(false);

  const [timePassed, setTimePassed] = createSignal(false);

  setTimeout(() => {
    setTimePassed(true);
  }, delay + 300);

  const toggleSelected = (e) => {
    if (!selected()) setSelected(true);
    else setSelected(false);
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
