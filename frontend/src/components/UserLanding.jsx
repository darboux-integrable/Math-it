import styles from "./user-landing.module.css";
import AssignmentList from "./AssignmentList";
import Navbar from "./Navbar";
import eulerImage from "../assets/Leonhard_Euler.jpg";
import Quote from "./Quote";
import waves from "../assets/waves/grayWaves.svg";
import shortenString from "../helpers/shortenText.js";
import { createSignal, onMount } from "solid-js";
import { fetchUserFromCookie } from "../helpers/userInSession.js";

/*
 * This UI Component is an entire page. It is the page the user visits when they just logged in or signed up.
 * Here they can find their assignments from their classes and also notifications from whatever activity they
 * have been doing. It also has a small place at the bottom left of the page for a mathematician of the day.
 */
const UserLanding = () => {
  const [user, setUser] = createSignal(false);
  const [notifications, setNotifications] = createSignal([]);
  const [assignments, setAssignments] = createSignal([]);

  const loadNotifications = (username) => {
    fetch(`http://127.0.0.1:5000/notifications/all_notifications/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  };

  const loadAssignments = (username) => {
    fetch(`http://127.0.0.1:5000/assignments/all_assignments/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data);
      });
  };

  fetchUserFromCookie((userData) => {
    setUser(userData);
    loadNotifications(user().username);
    loadAssignments(user().username);
  });

  return (
    <>
      <Navbar
        bg="dark"
        buttons={["Practice", "Classes", "Resources", "Post Questions"]}
      />
      <Show when={user()}>
        <section className={styles.topSection}>
          {/* Notifications Section */}
          <div className={styles.notificationBackground}>
            <div className={styles.notificationsSection}>
              <div className={styles.notificationsHeader}>
                <h1 className={styles.notificationsTitle}>Notifications</h1>
              </div>
              <div className={styles.notificationsBody}>
                <Show when={notifications()}>
                  {notifications().length == 0
                    ? "You currently do not have any notifications"
                    : notifications().map((notification) => {
                        console.log(notification);
                        return getNotificationElement(notification);
                      })}
                </Show>
              </div>
            </div>
          </div>

          <div className={styles.assignmentsContainer}>
            <Show when={assignments()}>
              <AssignmentList assignments={assignments()} />
            </Show>
          </div>
        </section>

        <img className={styles.waves} src={waves} alt="" />
        <div className={styles.waveTransition}>
          <div className={styles.bottomSection}>
            {/* Mathematician of th day Section */}
            <div className={styles.mathematicianBackground}>
              <div className={styles.mathematicianWrapper}>
                <div className={styles.mathematicianHeader}>
                  <h2 className={styles.mathematicianTitle}>Euler Leonhard</h2>
                </div>
                <div className={styles.mathematicianBody}>
                  <img className={styles.mathImage} src={eulerImage} alt="" />
                  <p className={styles.mathematicianAbout}>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Mi
                    sociosqu mollis imperdiet interdum penatibus ex tincidunt.
                    Primis placerat in viverra, vivamus suscipit phasellus.
                    Potenti aliquet efficitur vivamus congue nibh aliquam
                    maximus? Vestibulum vulputate luctus libero dolor tempus
                    nec. Commodo in varius fringilla rhoncus libero. Habitant
                    egestas commodo ullamcorper ipsum vehicula taciti eros
                    facilisis. Diam arcu id lacinia tristique elementum sapien.
                    Lacus erat mauris efficitur maecenas hendrerit conubia
                    turpis vel habitasse. Massa maximus fames in integer libero
                    facilisis. Class elementum fusce finibus; interdum hac vel
                    orci. Ex ante pulvinar tristique vitae curabitur ligula;
                    arcu nec volutpat. Consectetur magnis hendrerit tempor
                    dictum porttitor. Torquent sapien nascetur urna nec aliquet,
                    a ridiculus fames. Nibh ridiculus sed sollicitudin
                  </p>
                </div>
                <div className={styles.mathematicianQuotes}>
                  <Quote quoteText="some bullshit" author="-Adam"></Quote>
                </div>
              </div>
            </div>
            {/* Notifications Section */}
          </div>
        </div>
      </Show>
    </>
  );
};

function getNotificationElement(notification) {
  const type = notification.type;

  if (type === "grade")
    return (
      <GradeNotification
        title={notification.title}
        teacher={notification.teacher}
        timestamp={notification.timestamp}
        maxGrade={notification.max_grade}
        actualGrade={notification.actual_grade}
      />
    );
  else if (type === "assignment")
    return (
      <AssignmentNotification
        title={notification.title}
        teacher={notification.teacher}
        timestamp={notification.timestamp}
        className={notification.class_name}
        dueDate={notification.due_date}
      />
    );
  else if (type === "question")
    return (
      <QuestionNotification
        title={notification.title}
        user={notification.user}
        timestamp={notification.timestamp}
      />
    );
}

function AssignmentNotification({
  title,
  teacher,
  timestamp,
  dueDate,
  className,
}) {
  const text = `${teacher} posted a new assignment: "${title}"`;
  return (
    <div className={styles.notification}>
      <div className={styles.notificationHeader}>
        <h1 className={styles.notificationTitle}>New Assignment Posted</h1>
        <p className={styles.notificationTimestamp}>{timestamp}</p>
      </div>
      <div className={styles.notificationBody}>
        <div className={styles.notificationTop}>
          <p className={styles.notificationText}>{shortenString(text, 75)}</p>
        </div>
        <div className={styles.notificationBottom}>
          <p className={styles.dueDateText}>Due {dueDate}</p>
          <p className={styles.classText}>{className}</p>
        </div>
      </div>
    </div>
  );
}

function GradeNotification({
  title,
  maxGrade,
  actualGrade,
  teacher,
  timestamp,
}) {
  const text = `${teacher} posted a new grade for ${title}`;

  return (
    <div className={styles.notification}>
      <div className={styles.notificationHeader}>
        <h2 className={styles.notificationTitle}>New Grade Posted</h2>
        <p className={styles.notificationTimestamp}>{timestamp}</p>
      </div>

      <div className={styles.notificationBody}>
        <div className={styles.gradeNotificationBody}>
          <p className={styles.notificationText}>{shortenString(text, 75)}</p>
          <div className={styles.gradeWrapper}>
            <p className={styles.numerator}>{actualGrade}</p>
            <div className={styles.fractionBar}></div>
            <p className={styles.denominator}>{maxGrade}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionNotification({ user, title, timestamp }) {
  const text = `Your Question Titled: "${title}" was answered by ${user}`;

  return (
    <div className={styles.notification}>
      <div className={styles.notificationHeader}>
        <h1 className={styles.notificationTitle}>Your Question Was Answered</h1>
        <p className={styles.notificationTimestamp}>{timestamp}</p>
      </div>
      <div className={styles.notificationBody}>
        <p className={styles.notificationText}>{shortenString(text, 150)}</p>
      </div>
    </div>
  );
}

export default UserLanding;
