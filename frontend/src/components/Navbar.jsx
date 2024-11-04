import styles from "./navbar.module.css";
import logo from "../assets/logo.svg";

function Navbar({buttons}) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Math it logo" className={styles.navbarLogo} />
        <h1 className={styles.logoTitle}>Math-It</h1>
      </div>

      <div className={styles.navButtons}>
        {buttons.map((buttonText) => {
          return (
            <button
              className={`${styles.navButton} ${
                buttonText === "Login" ? styles.loginButton : ""
              }`}
            >
              {buttonText}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
