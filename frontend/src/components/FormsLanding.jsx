import styles from "./forms-landing.module.css";
import SideNavbar from "./SideNavbar";
import tagsJSON from "../json/tags.json";
import { createSignal } from "solid-js";
import QuestionTab from "./QuestionTab";
import { Show } from "solid-js";

function FormsLanding() {
  let tags = tagsJSON.tags;

  const [subjectFilter, setSubjectFilter] = createSignal("All Tags");
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

  let forms = [
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText:
        "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable",
    },
  ];

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
                    <Show when={subjectFilter() != "All Tags"}>
                      <div
                        className={styles.colorBox}
                        style={{ "background-color": subjectColor() }}
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
            {forms.map((form) => {
              return (
                <QuestionTab
                  title={form.title}
                  votes={form.votes}
                  answers={form.answers}
                  views={form.views}
                  startText={form.startText}
                  tags={form.tags}
                  username={form.username}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsLanding;
