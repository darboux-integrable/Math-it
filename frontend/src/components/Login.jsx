import { createSignal } from "solid-js";
import styles from "./login.module.css";
import propsJSON from "../json/landing.json";
import checkFilled from "../helpers/checkForFilledInputs.js";
import { saveUserCookie } from "../helpers/userInSession.js";

function Login() {
  const mathStrings = propsJSON.mathStrings;

  const [username, setUsername] = createSignal("");

  const [password, setPassword] = createSignal("");

  const [ok, setOk] = createSignal(true);
  const [error, setError] = createSignal("");

  const loginUser = () => {
    const usernameEncoded = encodeURIComponent(username());
    const passwordEncoded = encodeURIComponent(password());

    fetch(
      `http://127.0.0.1:5000/users?username=${usernameEncoded}&password=${passwordEncoded}`
    )
      .then((res) => {
        setOk(res.ok);
        return res.json();
      })
      .then((data) => {
        if (!ok()) {
          setError(data.detail);
        } else {
          const id = data._id;
          saveUserCookie(id);
          location.replace(`/users/landing`);
        }
      });
  };

  return (
    <>
      <div className={styles.contentWrapper} id="contentWrapper">
        <div className={styles.leftContent}>
          <h1 className={styles.loginTitle}>Login</h1>

          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
              <p className={styles.inputTitle}>Username:</p>
              <input
                type="text"
                value={username()}
                onInput={(e) => {
                  setUsername(e.target.value);
                }}
                className={`${styles.emailInput} ${styles.inputField}`}
                placeholder="Username"
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
          
          <Show when={!ok()}>
            <div className={styles.errorWrapper}>
              <p className={styles.errorText}>{error()}</p>
            </div>
          </Show>

          <button
            className={styles.loginButton}
            onclick={() => {
              if(checkFilled(password(), username())){
                loginUser();
              } else {
                setOk(false);
                setError("Not all Inputs are Filled");
              }
            }}
          >
            Login!
          </button>
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
