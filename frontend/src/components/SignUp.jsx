import { createSignal } from "solid-js";
import styles from "./sign-up.module.css";
import classroomIcon from "../assets/classroom.svg";
import tutoringIcon from "../assets/tutoring.svg";
import studentIcon from "../assets/math-student.svg";
import SubjectBar from "./SubjectBar";
import { Show } from "solid-js";
import subjectsJSON from "../json/subjects";
import checkFilled from "../helpers/checkForFilledInputs.js";
import { saveUserCookie } from "../helpers/userInSession.js";

function SignUp() {
  let subjects = subjectsJSON.subjects;

  // State used to manage the image on the right
  const [userImg, setUserImg] = createSignal(studentIcon);

  const [userType, setUserType] = createSignal("learner");

  // State for each of the different input fields
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [tutorSubjects, setTutorSubjects] = createSignal([]);

  // State used to handle request and input errors
  const [ok, setOk] = createSignal(true);
  const [error, setError] = createSignal("");

  // state for if the userType is tutor
  const [loadTutor, setLoadTutor] = createSignal(false);
  let slideLeftContent;
  let slideRightContent;

  const loadTutorSection = () => {
    slideLeftContent.className = slideLeftContent.className.replace(
      styles.fadeIn,
      " "
    );

    // Get container size
    const wrapper = document.getElementById("contentWrapper");
    wrapper.style.height = slideLeftContent.getBoundingClientRect().height + "px";

    slideLeftContent.className += " " + styles.fadeOut;
    setTimeout(() => {
      setLoadTutor(true);
      slideRightContent.className = slideRightContent.className.replace(
        styles.fadeOut,
        " "
      );
      slideRightContent.className += " " + styles.fadeIn;
    }, 400);
  };

  const loadSignupSection = () => {
    slideRightContent.className = slideRightContent.className.replace(
      styles.fadeIn,
      " "
    );
    slideRightContent.className += " " + styles.fadeOut;
    setTimeout(() => {
      setLoadTutor(false);
      slideLeftContent.className = slideLeftContent.className.replace(
        styles.fadeOut,
        " "
      );
      slideLeftContent.className += " " + styles.fadeIn;
    }, 400);
  };
  // Used to sign up a user.
  const signUp = () => {
    // Make a post reques to the backend to create a new user.
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
        subjects: tutorSubjects().length != 0 ? tutorSubjects() : null,
      }),
    })
      .then((res) => {
        setOk(res.ok); // Set the okay state to whatever the ok value for the request is.
        return res.json();
      })
      .then((data) => {
        if (ok()) {
          saveUserCookie(data.user_id);
          location.replace(`/users/landing`)
        } else {
          // If ok from the request is false, then there was a problem, so load the error message from the request.
          setError(data.detail);
        }
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
          <div ref={slideLeftContent} className={styles.slideLeftContent}>
            <div className={styles.leftContent}>
              <div className={`${styles.signUpWrapper}`}>
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
                <Show when={!ok()}>
                  <p className={styles.errorText}>{error()}</p>
                </Show>
                <button
                  className={styles.signUpButton}
                  onclick={() => {
                    if (
                      !checkFilled(
                        firstName(),
                        lastName(),
                        email(),
                        password(),
                        username()
                      )
                    ) {
                      setOk(false);
                      setError("Not all Inputs are filled");
                    } else {
                      if (userType() === "tutor") {
                        loadTutorSection();
                      } else {
                        signUp();
                      }
                    }
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div className={`${styles.sidebar}`}>
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
            <div className={`${styles.rightContent}`}>
              <div className={styles.userImgWrapper}>
                <img className={styles.userImg} src={userImg()} alt="" />
              </div>

              <div class={`${styles.loginLinkWrapper}`}>
                <p class={styles.loginText}>Already have an Account?</p>
                <button className={styles.loginButton} onclick={() => {location.replace("/login")}}>Login</button>
              </div>
            </div>
          </div>
        </Show>

        <Show when={loadTutor()}>
          <div ref={slideRightContent} className={styles.slideRightContent}>
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
              <div className={`${styles.tutorButtons}`}>
                <button
                  className={styles.signUpButton}
                  onclick={() => {
                    signUp();
                  }}
                >
                  Done!
                </button>
                <button className={styles.signUpButton} onclick={() => {loadSignupSection();}}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}

export default SignUp;
