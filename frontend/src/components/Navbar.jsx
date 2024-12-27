import styles from "./navbar.module.css";
import logo from "../assets/logo.svg";

function Navbar({ buttons, bg }) {
  return (
    <nav className={`${styles.navbar} ${bg == "dark" ? styles.darkNav : ""}`}>
        <div
          className={styles.logoContainer}
          onclick={() => {
            location.replace("/");
          }}
        >
          <img src={logo} alt="Math it logo" className={styles.navbarLogo} />
          <h1 className={styles.logoTitle}>Math-It</h1>
        </div>

      <div className={styles.navButtons}>
        {buttons.map((button) => {
          return (
            <button
              className={`${styles.navButton} ${
                button.text === "Login" ? styles.loginButton : ""
              }`}
              onclick={() => {location.replace(button.location)}}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
