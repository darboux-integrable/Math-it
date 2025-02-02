import styles from "./problems-page.module.css";
import { useSearchParams } from "@solidjs/router";
import SideNavbar from "./SideNavbar";
import { createSignal, Show } from "solid-js";

export default function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [problems, setProblems] = createSignal([]);
  const [answers, setAnswers] = createSignal([]);

  let problemIds = searchParams.ids.split(",");

  // 0 is for problems and 1 is for answers.
  const [activeButton, setActiveButton] = createSignal(0);

  const numProblemPerTopic = Math.floor(
    searchParams.numQuestions / problemIds.length
  );

  let numProblemsArray = [];
  for (let i = 0; i < problemIds.length; i++) {
    problemIds[i] = parseInt(problemIds[i]);
    numProblemsArray.push(numProblemPerTopic);
  }
  // Add the extra problem that may be excluded if the division is not perfect.
  numProblemsArray[numProblemsArray.length - 1] += Math.ceil(
    searchParams.numQuestions % problemIds.length
  );

  const getProblemSet = () => {
    fetch("http://127.0.0.1:5000/math/problem_set", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        topic_ids: problemIds,
        question_numbers: numProblemsArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let tempProblems = [];
        let tempAnswers = [];
        for (let i = 0; i < data.length; i++) {
          tempProblems.push(data[i].mathjax.replace("$$", "\\(").replace("$$", "\\)"));
          tempAnswers.push(
            data[i].answer.replace("$$", "\\(").replace("$$", "\\)")
          );
        }

        setProblems(tempProblems);
        setAnswers(tempAnswers);
      });
  };

  getProblemSet();

  return (
    <>
      <div className={styles.pageContent}>
        <SideNavbar />
        <div className={styles.mainContent}>
          <div className={styles.topContent}>
            <h1 className={styles.pageTitle}>Practice Problems:</h1>
            <div className={styles.navButtons}>
                <button
                  className={styles.topButton}
                  onclick={() => getProblemSet()}
                >
                  Genereate Again
                </button>
                <button
                  className={styles.topButton}
                  onclick={() => {
                    location.replace("/practice");
                  }}
                >
                  Back
                </button>
                <div className={styles.problemsAndAnswersButtonWrapper}>
                  <button
                    className={`${styles.halfButton} ${
                      activeButton() == 0 ? styles.activeButton : " "
                    }`}
                    onclick={() => {
                      setActiveButton(0);
                    }}
                  >
                    Problems
                  </button>
                  <button
                    className={`${styles.halfButton} ${
                      activeButton() == 1 ? styles.activeButton : " "
                    }`}
                    onclick={() => {
                      setActiveButton(1);
                    }}
                  >
                    Answers
                  </button>
                </div>
            </div>
          </div>
          <Show when={activeButton() == 0}>
            <div className={styles.problemsWrapper}>
              {problems().map((problem) => {
                return (
                  <div className={styles.problem}>
                    <p className={styles.problemNumber}>
                      {problems().indexOf(problem) + 1}.
                    </p>
                    <h3 className={styles.problemText}>{problem}</h3>
                  </div>
                );
              })}
            </div>
          </Show>
          <Show when={activeButton() == 1}>
            <div className={styles.answersWrapper}>
              {answers().map((answer) => {
                console.log(answer)
                return (
                  <div className={styles.answer}>
                    <p className={styles.problemNumber}>
                      {answers().indexOf(answer) + 1}.
                    </p>
                    <h3 className={styles.answerText}>{answer}</h3>
                  </div>
                );
              })}
            </div>
          </Show>
          {() => {
            problems();
            answers();
            activeButton();
            MathJax.typeset();
          }}
        </div>
      </div>
    </>
  );
}
