import styles from "./classrooms-page.module.css"
import SideNavbar from "./SideNavbar";
import ClassroomsList from "./ClassroomsList";

function ClassroomPage({id}){

    const classrooms = [
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
      {
        image: "/src/assets/temp/4.jpg",
        endDate: "Feb. 28th 2025",
        title: "Hist 101: Intro U.S. History",
        teacher: "Mr. Robert",
        startDate: "Dec. 15th 2024",
        passed: false,
      },
    ];

    return (
        <div className={styles.wrapper}>
            <SideNavbar />
            <div className={styles.pageContent}>
                <h1 className={styles.classroomsPageTitle}>Your Classrooms</h1>

                <div className={styles.currentListContainer}>
                    <ClassroomsList classrooms={classrooms} />
                </div>
            </div>
        </div>
    )
}

export default ClassroomPage;