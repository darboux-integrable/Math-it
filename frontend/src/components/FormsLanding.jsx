import styles from "./forms-landing.module.css";
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";
import { createSignal } from "solid-js";

function FormsLanding() {
  let subjects = subjectsJSON.subjects;

  const [subjectFilter, setSubjectFilter] = createSignal("Subject");

  const toggleActiveFilter = (e) => {
    e.preventDefault();
    const parent = e.target.parentElement;

    const children = parent.children;

    // Make sure only the clicked filter is styled as active.
    for (let i = 0; i < children.length; i++) {
      if (children[i] === e.target) {
        children[i].classList.add(styles.activeFilter);
      } else {
        children[i].classList.remove(styles.activeFilter);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <div className={styles.formsWrapper}>
          <div className={styles.formsHead}>
            <div className={styles.headTop}>
              <h1 className={styles.formsTitle}>All Questions</h1>
              <button className={styles.askButton}>Ask Question</button>
            </div>

            <div className={styles.headBottom}>
              <h2 className={styles.questionsCountText}>1,211,209 Questions</h2>

              <div className={styles.optionsWrapper}>
                <div className={styles.filtersContainer}>
                  <button
                    className={`${styles.filterButton} ${styles.activeFilter}`}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                    }}
                  >
                    Newest
                  </button>
                  <button
                    className={styles.filterButton}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                    }}
                  >
                    Answered
                  </button>
                  <button
                    className={styles.filterButton}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                    }}
                  >
                    Unanswered
                  </button>
                </div>

                <div className={styles.subjectFiltersWrapper}>
                  <div className={styles.currentSubjectButton}>
                    {subjectFilter()}
                  </div>
                  <div className={styles.subjectFilters}>
                    {subjects.map((subject) => {
                      return (
                        <div
                          className={styles.subjectFilter}
                          onclick={() => setSubjectFilter(subject.subject)}
                        >
                          <div
                            className={styles.subjectColor}
                            style={{ "background-color": subject.color1 }}
                          ></div>
                          <div className={styles.subjectTextWrapper}>
                            <h4 className={styles.subjectText}>
                              {subject.subject}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsLanding;
