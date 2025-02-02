import styles from "./forms-landing.module.css";
import SideNavbar from "./SideNavbar";
import tagsJSON from "../json/tags.json";
import { createSignal } from "solid-js";
import QuestionTab from "./QuestionTab";
import { Show } from "solid-js";

function FormsLanding({subjectFilterInit}) {
  let tags = tagsJSON.tags;
  const [subjectFilter, setSubjectFilter] = createSignal(decodeURIComponent(subjectFilterInit));
  const [subjectColor, setSubjectColor] = createSignal("");

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

  let [forms, setForms] = createSignal([]);
  let [filteredForms, setFilteredForms] = createSignal([]);

  let filterMethod;

  let filterBySubject = () => {
    setFilteredForms(
      subjectFilter().toLowerCase() == "all tags"
        ? filterMethod()
        : filterMethod().filter((form) =>
            form.tags.includes(subjectFilter().toLowerCase())
          )
    );
  };

  fetch(`http://127.0.0.1:5000/questions/all_questions`)
    .then((res) => res.json())
    .then((formsData) => {
      setForms(formsData);

      filterMethod = () => new Array(...forms()).reverse();
      setFilteredForms(filterMethod());
      filterBySubject();
    });

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <div className={styles.formsWrapper}>
          <div className={styles.formsHead}>
            <div className={styles.headTop}>
              <h1 className={styles.formsTitle}>All Questions</h1>
              <button
                className={styles.askButton}
                onclick={() => {
                  location.replace("/questions/ask");
                }}
              >
                Ask Question
              </button>
            </div>
            <div className={styles.headBottom}>
              <h2 className={styles.questionsCountText}>
                {filteredForms().length} Questions
              </h2>

              <div className={styles.optionsWrapper}>
                <div className={styles.filtersContainer}>
                  <button
                    className={`${styles.filterButton} ${styles.activeFilter}`}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                      filterMethod = () => new Array(...forms()).reverse();
                      setFilteredForms(filterMethod());
                      filterBySubject();
                    }}
                  >
                    Newest
                  </button>
                  <button
                    className={styles.filterButton}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                      filterMethod = () =>
                        forms().filter((form) => form.answers > 0);
                      setFilteredForms(filterMethod());
                      filterBySubject();
                    }}
                  >
                    Answered
                  </button>
                  <button
                    className={styles.filterButton}
                    onClick={(e) => {
                      toggleActiveFilter(e);
                      filterMethod = () =>
                        forms().filter((form) => form.answers == 0);

                      setFilteredForms(filterMethod());
                      filterBySubject();
                    }}
                  >
                    Unanswered
                  </button>
                </div>

                <div className={styles.subjectFiltersWrapper}>
                  <div className={styles.currentSubjectButton}>
                    <Show when={subjectFilter() != "All Tags"}>
                      <div
                        className={styles.colorBox}
                        style={{ "background-color": subjectColor() || `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}}
                      ></div>
                    </Show>

                    <p>{subjectFilter()}</p>
                  </div>
                  <div className={styles.subjectFilters}>
                    {tags.map((tag) => {
                      return (
                        <div
                          className={styles.subjectFilter}
                          onclick={() => {
                            setSubjectFilter(tag.name);
                            setSubjectColor(tag.color);
                            filterBySubject();

                          }}
                        >
                          <div
                            className={styles.subjectColor}
                            style={{ "background-color": tag.color }}
                          ></div>
                          <div className={styles.subjectTextWrapper}>
                            <h4 className={styles.subjectText}>{tag.name}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class={styles.formsBody}>
            {filteredForms().map((form) => {
              return (
                <QuestionTab
                  questionId={form._id}
                  title={form.title}
                  votes={form.votes}
                  answers={form.answers}
                  views={form.views}
                  startText={form.text}
                  tags={form.tags}
                  username={form.user_asking}
                  delay = {filteredForms().indexOf(form) * 100}
                />
              );
            })}
          </div>
        </div>
      </div>
      {() => {
        filteredForms();
        MathJax.typeset();
      }}
    </div>
  );
}

export default FormsLanding;
