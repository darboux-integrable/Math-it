import styles from "./side-navbar.module.css";

function SideNavbar({ buttons }) {
  return (
    <div class={styles.navbar}>
      {buttons.map((button) => {
        // Each button has an icon, title, active, and text property
        return (
          <div className={styles.wrapper}>
            <div className={styles.navSection}>
              <img
                src={button.icon}
                className={styles.sectionIcon}
                alt="Icon image"
              />

              <div className={styles.textSection}>
                <h2 className={styles.sectionTitle}>{button.title}</h2>
                <p className={styles.sectionText}>{button.text}</p>
              </div>
            </div>
            <div
              className={styles.sectionBackground}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default SideNavbar;
