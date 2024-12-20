import styles from "./classroom-student-landing.module.css";
import { getCookieValue } from "../helpers/userInSession.js";
import { useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import AssignmentList from "./AssignmentList";
import ClassroomStudentNavBar from "./ClassroomStudentNavBar";
import Announcement from "./Announcement";
import tempImage from "../assets/temp/6.jpg";
import homeIcon from "../assets/home.svg";

function ClassroomStudentLanding() {
  const params = useParams();
  const classroomId = params.id;
  const userId = getCookieValue("userID");

  const [error, setError] = createSignal("");

  const announcements = [
    {
      title: "Class Created",
      text: "This is a default announcement created to test the announcements in the page.",
      postDate: "Dec. 19 2024",
    },
    {
      title: "Class Created",
      text: "This is a default announcement created to test the announcements in the page.",
      postDate: "Dec. 19 2024",
    },
    {
      title: "Class Created",
      text: "This is a default announcement created to test the announcements in the page.",
      postDate: "Dec. 19 2024",
    },
  ];

  return (
    <>
      <ClassroomStudentNavBar />
      <div className={styles.pageOpening}>
        <div className={styles.pagePictureWrapper}>
          <img
            src={tempImage}
            alt="Classroom Picture"
            className={styles.pageImage}
          />
          <h1 className={styles.classTitle}>
            GEO 101: Introduction to Geology
          </h1>
        </div>

        <main className={styles.announcementsAndAssignments}>
          <div className={styles.announcementBackground}>
              <div className={styles.announcementsWrapper}>
                <h1 className={styles.announcementsSectionTitle}>Announcements</h1>
                <div className={styles.announcementsList}>
                  {announcements.map((announcement) => {
                    return (
                      <Announcement
                        title={announcement.title}
                        text={announcement.text}
                        postDate={announcement.postDate}
                      />
                    );
                  })}
                </div>
              </div>
          </div>
          <div className={styles.assignmentsWrapper}>
            <AssignmentList assignments={[]} />
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassroomStudentLanding;
