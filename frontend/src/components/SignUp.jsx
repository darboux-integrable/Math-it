import { createSignal } from "solid-js";
import styles from "./sign-up.module.css";
import classroomIcon from "../assets/classroom.svg";
import tutoringIcon from "../assets/tutoring.svg";
import studentIcon from "../assets/math-student.svg";
import Navbar from "./Navbar";
import SubjectBar from "./SubjectBar";
import { Show } from "solid-js";
import subjectsJSON from "../json/subjects";

function SignUp() {
  let subjects = subjectsJSON.subjects;

  const [userImg, setUserImg] = createSignal(studentIcon);

  const [userType, setUserType] = createSignal("learner");

  const [loadTutor, setLoadTutor] = createSignal(false);

  const toggleUser = (e, userTypeValue) => {
    const parent = e.target.parentElement;

    for (let i = 0; i < parent.childNodes.length; i++) {
      let child = parent.childNodes[i];
      child.className = child.className.replace(styles.activeButton, "");
    }

    setUserType(userTypeValue);

    e.target.className += styles.activeButton;
  };

  return (
    <>
      <Navbar buttons={["Login"]} bg="dark"></Navbar>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper} id="contentWrapper">
          <Show when={!loadTutor()}>
            <div className={styles.leftContent}>
              <div className={`${styles.signUpWrapper} fade-out-content `}>
                <h1 className={styles.signUpTitle}>Sign Up</h1>
                <div className={styles.signUpInputs}>
                  <div className={styles.inputWrapper}>
                    <p className={styles.inputTitle}>Username:</p>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Enter your Username"
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <p className={styles.inputTitle}>Email:</p>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Enter your Email Address"
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <p className={styles.inputTitle}>Password:</p>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <button
                  className={styles.signUpButton}
                  onclick={() => {
                    if (userType() === "tutor") {
                      let fadeOutElems = new Array(
                        ...document.getElementsByClassName("fade-out-content")
                      );

                      let containerElement = document.getElementById("contentWrapper");

                      let height = containerElement.getBoundingClientRect().height;
                      
                      containerElement.style.height = height + "px";

                      fadeOutElems.forEach((element) => {
                        element.className += styles.fadeOut;
                      });

                      setTimeout(() => {
                        setLoadTutor(true);
                      }, 300);
                    } else {
                      // Load the signed-in user landing page.
                      
                    }
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div className={`${styles.sidebar} fade-out-content `}>
                <button
                  className={styles.userTypeButton}
                  onClick={(e) => {
                    setUserImg(classroomIcon);
                    toggleUser(e, "educator");
                  }}
                >
                  Educator
                </button>
                <button
                  className={`${styles.userTypeButton} ${styles.activeButton}`}
                  onClick={(e) => {
                    setUserImg(studentIcon);
                    toggleUser(e, "learner");
                  }}
                >
                  Learner
                </button>
                <button
                  className={styles.userTypeButton}
                  onClick={(e) => {
                    setUserImg(tutoringIcon);
                    toggleUser(e, "tutor");
                  }}
                >
                  Tutor
                </button>
              </div>
            </div>
            <div className={`${styles.rightContent} fade-out-content `}>
              <div className={styles.userImgWrapper}>
                <img className={styles.userImg} src={userImg()} alt="" />
              </div>

              <div class={styles.loginLinkWrapper}>
                <p class={styles.loginText}>Already have an Account?</p>
                <button className={styles.loginButton}>Login</button>
              </div>
            </div>
          </Show>

          <Show when={loadTutor()}>
            <div className={`${styles.tutorWrapper} ${styles.fadeIn}`}>
              <h1 className={styles.tutorTitle}>Tutor</h1>

              <p className={`${styles.tutorText} ${styles.fadeIn}`}>
                Please select each topic that your are perficient in from the
                follow list:
              </p>

              <div className={`${styles.topicsWrapper} ${styles.fadeIn}`}>
                {subjects.map((subject) => {
                  const index = subjects.indexOf(subject)
                  return (
                    <SubjectBar
                      color="red"
                      subject={subjects[index].subject}
                      delay={index * 100 + 300}
                      color1={subjects[index].color1}
                      color2={subjects[index].color2}
                    />
                  );
                })}
              </div>
              <button className={styles.signUpButton}>Done!</button>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
}

export default SignUp;
