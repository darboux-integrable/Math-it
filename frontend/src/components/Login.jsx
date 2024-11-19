import { createSignal } from "solid-js";
import styles from "./login.module.css";
import { A } from "@solidjs/router";
import propsJSON from "../json/landing.json";

function Login() {
  const mathStrings = propsJSON.mathStrings;

  const [firstName, setFirstName] = createSignal("");

  const [lastName, setLastName] = createSignal("");

  const [usernameOrEmail, setUserNameOrEmail] = createSignal("");

  const [password, setPassword] = createSignal("");

  return (
    <>
      <div className={styles.contentWrapper} id="contentWrapper">
        <div className={styles.leftContent}>
          <h1 className={styles.loginTitle}>Login</h1>

          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
              <p className={styles.inputTitle}>First and Last Names:</p>
              <div className={styles.nameInputs}>
                <input
                  value={firstName()}
                  onInput={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className={`${styles.nameInput} ${styles.inputField}`}
                  placeholder="First Name"
                />
                <input
                  value={lastName()}
                  onInput={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  className={`${styles.nameInput} ${styles.inputField}`}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <p className={styles.inputTitle}>Username or Email:</p>
              <input
                type="text"
                value={usernameOrEmail()}
                onInput={(e) => {
                  setUserNameOrEmail(e.target.value);
                }}
                className={`${styles.emailInput} ${styles.inputField}`}
                placeholder="Username Or Email"
              />
            </div>

            <div className={styles.inputWrapper}>
              <p className={styles.inputTitle}>Password:</p>
              <input
                type="text"
                value={password()}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
                className={`${styles.passwordInput} ${styles.inputField} `}
                placeholder="Password"
              />
            </div>
          </div>

          <button className={styles.loginButton}>Login!</button>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.signUpTextWrapper}>
            <p className={styles.signupText}>Don't Have an Account?</p>

            <button className={styles.signUpButton}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
