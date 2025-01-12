import styles from "./classroom-student-landing.module.css";
import { getCookieValue } from "../helpers/userInSession.js";
import { useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import AssignmentList from "./AssignmentList";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import tempImage from "../assets/temp/6.jpg";
import homeIcon from "../assets/home.svg";
//data:image/jpeg;base64,
function ClassroomStudentLanding({}) {
  const params = useParams();
  const classroomId = params.id;
  const userId = getCookieValue("userID");

  const [error, setError] = createSignal("");

  const [announcements, setAnnouncements] = createSignal([]);
  const [imgSrc, setImgSrc] = createSignal("");
  const [classTitle, setClassTitle] = createSignal("");
  const [assignments, setAssignments] = createSignal([]);

  fetch("http://127.0.0.1:5000/classrooms/" + classroomId)
    .then((res) => res.json())
    .then((data) => {
      setImgSrc("data:image/jpeg;base64," + data.image);
      setClassTitle(data.title);
    })
    .catch((err) => setError("Error: Could not fetch this class"));


  fetch(`http://127.0.0.1:5000/announcements?classroom_id=${classroomId}`)
    .then((res) => res.json())
    .then((announcementsArray) => {
      setAnnouncements(announcementsArray);
    });


  fetch(`http://127.0.0.1:5000/assignments/not_passed/classroom/${classroomId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setAssignments(data);
    });
    
  return (
    <>
      <Navbar
        bg="dark"
        buttons={[
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/learner/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/learner/discussions`,
          },
          { text: "Grades", location: `/classrooms/${classroomId}/learner/grades` },
        ]}
      />
      <div className={styles.pageOpening}>
        <Show when={imgSrc() != "" && classTitle() != ""}>
          <div className={styles.pagePictureWrapper}>
            <img
              src={imgSrc()}
              alt="Classroom Picture"
              className={styles.pageImage}
            />
            <h1 className={styles.classTitle}>{classTitle()}</h1>
          </div>
        </Show>

        <main className={styles.announcementsAndAssignments}>
          <div className={styles.announcementBackground}>
            <div className={styles.announcementsWrapper}>
              <h1 className={styles.announcementsSectionTitle}>
                Announcements
              </h1>
              <div className={styles.announcementsList}>
                <Show when={announcements()}>
                  {announcements().length == 0
                    ? "No Announcements"
                    : announcements().map((announcement) => {
                        return (
                          <Announcement
                            title={announcement.title}
                            text={announcement.text}
                            postDate={announcement.post_date}
                          />
                        );
                      })}
                </Show>
                {() => {
                  announcements();
                  MathJax.typeset();
                }}
              </div>
            </div>
          </div>
          <div className={styles.assignmentsWrapper}>
            <AssignmentList assignments={assignments} />
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassroomStudentLanding;
