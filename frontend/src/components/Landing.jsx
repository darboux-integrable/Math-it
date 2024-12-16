import { createSignal } from "solid-js";
import styles from "./landing.module.css";
import puzzleIcon from "../assets/puzzle.svg";
import postIcon from "../assets/post.svg";
import gradeIcon from "../assets/grade.png";
import basic4Icon from "../assets/basic4.svg";
import teacherIcon from "../assets/teacher.svg";
import Navbar from "./Navbar";
import Quote from "./Quote";
import Feature from "./Feature";
import landingJSON from "../json/landing";

let subjects = landingJSON.subjects;
let mathStrings = landingJSON.mathStrings;
const quotes = landingJSON.quotes;
const features = landingJSON.features;
const icons = [basic4Icon, postIcon, teacherIcon, gradeIcon, puzzleIcon];

function Landing() {
  const [subject, setSubject] = createSignal("Algebra");

  const subjectTimer = 4500;

  setInterval(() => {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    setTimeout(() => {
      setSubject(subject);
    }, subjectTimer * 0.4);
  }, subjectTimer);

  return (
    <>
      <div>
        <Navbar buttons={["Sign Up","Login"]} />
        <section className={styles.openingContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.pageTitle}>Math-It</h1>
            <p className={styles.openingText}>For all your trouble in</p>
            <div className={styles.subjectContainer}>
              <p className={styles.subjectText}>{subject()}</p>
            </div>
          </div>
          <div className={styles.openingTriangles}>
            <div className={styles.openingTriangle}></div>
            <div className={styles.openingTriangle2}>Overview</div>
          </div>
        </section>
      </div>

      <div className={styles.mathUpCanvas} id="mathCanvas">
        {mathStrings.map((equation) => {
          const timer = mathStrings.indexOf(equation) * 1000;
          return (
            <h2
              className={styles.mathItem}
              style={{
                "animation-delay": `${timer}ms`,
                left: `${Math.floor(Math.random() * window.innerWidth)}px`,
              }}
            >
              {equation}
            </h2>
          );
        })}
        {() => {
          MathJax.typeset();
        }}
      </div>

      <section className={styles.aboutSection}>
        <div className={styles.aboutTextWrapper}>
          <p class={styles.aboutText}>
            Math-It is a nonprofit project dedicated to improving math education
            for students of all ages. We provide a comprehensive platform for{" "}
            <a href="#" class={styles.aboutTextLink}>
              math practice
            </a>
            , allowing learners to enhance their skills at their own pace. Our
            tools enable teachers to{" "}
            <a href="#" class={styles.aboutTextLink}>
              create customized classes
            </a>{" "}
            and monitor student progress effectively, ensuring that every
            learner receives the support they need to succeed. Additionally,
            Math-It features interactive forums where users can{" "}
            <a href="#" class={styles.aboutTextLink}>
              post questions and receive answers
            </a>{" "}
            from a supportive community of peers and educators. By fostering
            collaboration and providing valuable resources, Math-It is committed
            to making math accessible, engaging, and enjoyable for everyone. And
            all this, build by a single student with Jesus helping him through
            it.
          </p>
        </div>

        <section className={styles.quoteSection}>
          {quotes.map((quote) => {
            return <Quote quoteText={quote.quoteText} author={quote.author} />;
          })}
        </section>
      </section>

      <h1 className={styles.featuresTitle}>Features</h1>
      <section className={styles.featuresSection}>
        {features.map((feature) => {
          return (
            <Feature
              title={feature.title}
              icon={icons[features.indexOf(feature)]}
              text={feature.text}
            />
          );
        })}
      </section>
    </>
  );
}

export default Landing;

//   ]<a target="_blank" href="https://icons8.com/icon/31002/grades">Grade</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
{
  /* <a href="https://www.flaticon.com/free-icons/grade" title="grade icons">Grade icons created by Freepik - Flaticon</a> */
}
