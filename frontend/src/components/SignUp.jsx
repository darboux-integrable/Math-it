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

  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [tutorSubjects, setTutorSubjects] = createSignal([]);

  const [ok, setOk] = createSignal(true);
  const [error, setError] = createSignal("");

  const loadTutorSection = () => {
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
  };

  const checkAllInputsValid = () => {
    if (
      !firstName().trim() ||
      !lastName.trim() ||
      !password().trim() ||
      !email().trim() ||
      !username().trim()
    ) {
      return false;
    }

    return true;
  };

  const signUp = () => {
    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username(),
        first_name: firstName(),
        last_name: lastName(),
        email: email(),
        password: password(),
        account_type: userType(),
      }),
    })
      .then((res) => {
        setOk(res.ok);
        return res.json();
      })
      .then((data) => {
        if (ok()) {
          location.replace("/users/" + data.user_id + "/landing");
        } else {
          setError(data.detail);
        }
      });
  };

  const signUpTutor = () => {
    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username(),
        first_name: firstName(),
        last_name: lastName(),
        email: email(),
        password: password(),
        account_type: userType(),
        subjects: tutorSubjects(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

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
      <div className={styles.contentWrapper} id="contentWrapper">
        <Show when={!loadTutor()}>
          <div className={styles.leftContent}>
            <div className={`${styles.signUpWrapper} fade-out-content `}>
              <h1 className={styles.signUpTitle}>Sign Up</h1>

              <div className={styles.signUpInputs}>
                <div className={styles.namesInputsWrapper}>
                  <div className={styles.namesInputs}>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="First Name"
                      value={firstName()}
                      oninput={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Last Name"
                      value={lastName()}
                      oninput={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter your Username"
                    value={username()}
                    oninput={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter your Email Address"
                    value={email()}
                    oninput={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter your Password"
                    value={password()}
                    oninput={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={styles.signUpButton}
                onclick={() => {
                  if(!checkAllInputsValid()){
                    setOk(false);
                    setError("Not all Inputs are filled")
                  }

                  if (userType() === "tutor") {
                    loadTutorSection();
                  } else {
                    signUp();
                  }
                }}
              >
                Sign Up
              </button>

              <Show when={!ok()}>
                <p className={styles.errorText}>{error()}</p>
              </Show>
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
                const index = subjects.indexOf(subject);
                return (
                  <SubjectBar
                    subject={subjects[index].subject}
                    delay={index * 100 + 300}
                    color1={subjects[index].color1}
                    subjectsArray={tutorSubjects}
                    setSubjectsArray={setTutorSubjects}
                  />
                );
              })}
            </div>
            <button
              className={styles.signUpButton}
              onclick={() => {
                signUpTutor();
              }}
            >
              Done!
            </button>
          </div>
        </Show>
      </div>
    </>
  );
}

export default SignUp;
