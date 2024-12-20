import styles from "./classroom-student-navbar.module.css"

function ClassroomStudentNavBar(){
    return (
      <nav className={styles.navbar}>
        <button className={styles.navButton}>Course Home</button>
        <button className={styles.navButton}>Assignments</button>
        <button className={styles.navButton}>Discussions</button>
        <button className={styles.navButton}>Grades</button>
      </nav>
    );
}

export default ClassroomStudentNavBar;