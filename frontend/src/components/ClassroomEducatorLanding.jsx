import styles from "./classroom-educator-landing.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import NotificationArea from "./NotificationArea";
import { createSignal } from "solid-js";
import Announcement from "./Announcement";

function ClassroomEducatorLandingPage() {
  const params = useParams();

  const classroomId = params.id;

  const [announcements, setAnnouncements] = createSignal([]);
  const [imgSrc, setImgSrc] = createSignal("");
  const [classTitle, setClassTitle] = createSignal("");
  const [teacherTitle, setTeacherTitle] = createSignal("");
  const [notifications, setNotifications] = createSignal([]);

  fetch("http://127.0.0.1:5000/classrooms/" + classroomId)
    .then((res) => res.json())
    .then((data) => {
      setAnnouncements(data.announcements);
      setImgSrc("data:image/jpeg;base64," + data.image);
      setClassTitle(data.title);
      setTeacherTitle(data.teacher);
    })
    .catch((err) => setError("Error: Could not fetch this class"));
  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Student Progress",
            location: `/classrooms/${classroomId}/educator/studentProgress`,
          },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/educator/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/educator/discussions`,
          },
          {
            text: "Grades",
            location: `/classrooms/${classroomId}/educator/grades`,
          },
        ]}
        bg="dark"
      />

      <div className={styles.topContent}>
        <div className={styles.courseImage}>
          <img
            className={styles.classImage}
            src={imgSrc()}
            alt="Course Image"
          />
          <h1 className={styles.courseTitle}>{classTitle()}</h1>
        </div>
        <div className={styles.teacherWelcome}>
          <h1 className={styles.welcomeText}>Welcome</h1>
          <h1 className={styles.teacherNameTitle}>{teacherTitle()}</h1>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.announcementsBackground}>
          <div className={styles.announcementsSection}>
            <div className={styles.newAnnouncementWrapper}>
              <h2 className={styles.newAnnouncementTitle}>New Announcement</h2>
              <TextArea />
              <div className={styles.createAnnouncementWrapper}>
                <button className={styles.createAnnouncementButton}>
                  Create!
                </button>
              </div>
            </div>
            <div className={styles.previousAnnouncementsWrapper}>
              <h2 className={styles.previousAnnouncementsTitle}>
                Previous Announcements
              </h2>
              <div className={styles.previousAnnouncements}>
                {announcements().length == 0
                  ? "No Previous Announcements"
                  : announcements().map((announcement) => {
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
        </div>

       <NotificationArea notifications={notifications} />
      </div>
    </>
  );
}

export default ClassroomEducatorLandingPage;
