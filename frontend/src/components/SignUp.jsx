import { createSignal } from "solid-js";
import styles from "./sign-up.module.css";
import classroomIcon from "../assets/classroom.svg";
import tutoringIcon from "../assets/tutoring.svg";
import studentIcon from "../assets/math-student.svg";

function SignUp() {
  const [userImg, setUserImg] = createSignal(studentIcon);

  const [userType, setUserType] = createSignal("learner");

  return (
    <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftContent}>
            <div className={styles.sidebar}>
              <button
                className={styles.userTypeButton}
                onclick={() => {
                  setUserImg(classroomIcon);
                }}
              >
                Educator
              </button>
              <button
                className={styles.userTypeButton}
                onclick={() => {
                  setUserImg(tutoringIcon);
                }}
              >
                Learner
              </button>
              <button
                className={styles.userTypeButton}
                onclick={() => {
                  setUserImg(studentIcon);
                }}
              >
                Tutor
              </button>
            </div>
            <div className={styles.signUpWrapper}>
              <h1 className={styles.signUpTitle}>Sign Up</h1>
              <div className={styles.signUpInputs}>
                <input
                  type="text"
                  classList={styles.inputField}
                  placeholder="Enter your Username"
                />
                <input
                  type="text"
                  classList={styles.inputField}
                  placeholder="Enter your Email Address"
                />
                <input
                  type="text"
                  classList={styles.inputField}
                  placeholder="Enter Your Password"
                />
                <input
                  type="text"
                  classList={styles.inputField}
                  placeholder="Confirm Your Password"
                />
              </div>
              <button className={styles.signUpButton}>Sign Up</button>
            </div>
          </div>
          <div className={styles.rightContent}>
            <img className={styles.userImg} src={userImg()} alt="" />
            <a href="#">
              Already have an account? <br /> Login{" "}
            </a>
          </div>
        </div>
    </div>
  );
}

export default SignUp;
