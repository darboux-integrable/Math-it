import styles from "./classroom-educator-landing.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import NotificationArea from "./NotificationArea";
import { createSignal } from "solid-js";
import Announcement from "./Announcement";
import { formateDate } from "../helpers/dateFormatter.js";

function ClassroomEducatorLandingPage() {
  const params = useParams();

  const classroomId = params.id;

  const [newAnnouncementText, setNewAnnouncementText] = createSignal("");
  const [newAnnouncementTitle, setNewAnnouncementTitle] = createSignal("");

  const [announcements, setAnnouncements] = createSignal([]);
  const [imgSrc, setImgSrc] = createSignal("");
  const [classTitle, setClassTitle] = createSignal("");
  const [teacherTitle, setTeacherTitle] = createSignal("");
  const [notifications, setNotifications] = createSignal([]);

  fetch("http://127.0.0.1:5000/classrooms/" + classroomId)
    .then((res) => res.json())
    .then((data) => {
      setImgSrc("data:image/jpeg;base64," + data.image);
      setClassTitle(data.title);
      setTeacherTitle(data.teacher);
    })
    .catch((err) => setError("Error: Could not fetch this class"));

  fetch(`http://127.0.0.1:5000/announcements?classroom_id=${classroomId}`)
    .then((res) => res.json())
    .then((announcementsArray) => {
      setAnnouncements(announcementsArray);
    });

  const createAnnouncement = () => {
    const date = new Date();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();


    fetch("http://127.0.0.1:5000/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newAnnouncementTitle(),
        text: newAnnouncementText(),
        post_date: formateDate(`${year}-${month}-${day}`),
        classroom_id: classroomId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      });
  };
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
              <input type="text" className={styles.newAnnouncementTitleInput} placeholder="Enter Announcement Title" value={newAnnouncementTitle()} oninput={(e) => {setNewAnnouncementTitle(e.target.value)}}/>

              <TextArea
                currentText={newAnnouncementText}
                setCurrentText={setNewAnnouncementText}
              />
              <div className={styles.createAnnouncementWrapper}>
                <button
                  className={styles.createAnnouncementButton}
                  onclick={() => createAnnouncement()}
                >
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
                          postDate={announcement.post_date}
                        />
                      );
                    })}
                {/* Need this the announcements() line so the mathjax fires. IDFK why */}
                {/* I think it is because MathJax.typeset is firing b4 the announcements load */}
                {/* and having the announcements() line tells SolidJS to rerun the code block */}
                {/* and thus, the MathJax.typeset is fired again and it all works */}
                {() => {
                  announcements();
                  MathJax.typeset();
                }}
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
