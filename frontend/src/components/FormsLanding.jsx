import styles from "./forms-landing.module.css";
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";
import { createSignal } from "solid-js";
import QuestionTab from "./QuestionTab";
import { Show } from "solid-js";

function FormsLanding() {
  let subjects = subjectsJSON.subjects;

  const [subjectFilter, setSubjectFilter] = createSignal("All Subjects");
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
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
    {
      title: "Help Loading Angular JS Templates",
      votes: 2,
      answers: 1,
      views: 20,
      startText: "I have been learning angular JS for about a week and am having trouble loading my JSX templates. In the App.jsx, I create a router element and do more stuff to it to make it do more things for which is undisclosed to you, the reader.",
      tags: ["JS", "Angular", "JSX"],
      username: "DarbouxIntegrable"
    },
  ]

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
                    <Show when={subjectFilter() != "All Subjects"}>
                      <div className={styles.colorBox} style={{"background-color": subjectColor()}}></div>
                    </Show>

                    <p>{subjectFilter()}</p>
                  </div>
                  <div className={styles.subjectFilters}>
                    {subjects.map((subject) => {
                      return (
                        <div
                          className={styles.subjectFilter}
                          onclick={() =>{setSubjectFilter(subject.subject); setSubjectColor(subject.color1)}}
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
          <div class={styles.formsBody}>
            {forms.map((form) => {

              return (<QuestionTab title={form.title} votes={form.votes} answers={form.answers} views={form.views} startText={form.startText} tags={form.tags} username={form.username}/>)

            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsLanding;
