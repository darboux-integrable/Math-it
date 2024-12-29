import styles from "./user-landing.module.css";
import AssignmentList from "./AssignmentList";
import Navbar from "./Navbar";
import eulerImage from "../assets/Leonhard_Euler.jpg";
import Quote from "./Quote";
import waves from "../assets/waves/grayWaves.svg";
import { createSignal } from "solid-js";
import NotificationArea from "./NotificationArea";
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

  const loadNotifications = (id) => {
    fetch(`http://127.0.0.1:5000/notifications/all_notifications/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  };

  const loadAssignments = (id) => {
    fetch(`http://127.0.0.1:5000/assignments/not_passed/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data);
      });
  };

  fetchUserFromCookie((userData) => {
    setUser(userData);
    loadNotifications(user()._id);
    loadAssignments(user()._id);
  });

  return (
    <>
      <Navbar
        bg="dark"
        buttons={[
          { text: "Practice", location: "/practice" },
          { text: "Classes", location: "/classrooms/landing" },
          { text: "Resources", location: "/resources" },
          { text: "Post Questions", location: "/questions" },
        ]}
      />
      <Show when={user()}>
        <section className={styles.topSection}>
          {/* Notifications Section */}
          <NotificationArea notifications={notifications} />

          <div className={styles.assignmentsContainer}>
            <AssignmentList assignments={assignments} />
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

export default UserLanding;
