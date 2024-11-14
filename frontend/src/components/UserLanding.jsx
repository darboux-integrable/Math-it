import styles from "./user-landing.module.css";
import AssignmentList from "./AssignmentList";
import Navbar from "./Navbar";
import eulerImage from "../assets/Leonhard_Euler.jpg";
import Quote from "./Quote";
import waves from "../assets/waves/grayWaves.svg";

const UserLanding = () => {
  let user = {
    userName: "DarbouxIntegrable",
    assignments: [
      {
        title: "Homework 9.2",
        class: "Calculus 2",
        period: "A1",
        teacher: "Mr. Streets",
        dueDate: { month: "Sep", day: 10, time: "11:59PM" },
      },
      {
        title: "Homework 9.2",
        class: "Calculus 2",
        period: "A1",
        teacher: "Mr. Streets",
        dueDate: { month: "Sep", day: 10, time: "11:59PM" },
      },

    ],
    notifications: [
      {
        type: "question",
        title: "Your Question was Answered",
        text: "User1212 replied to your post titled 'Help Understand Systems of linear equations'",
      },
      {
        type: "assignment",
        title: "A New Assignment Was Posted",
        text: "Mr. Miller Posted '1st and 2nd Derivative Test Quiz'.",
        class: "Calculus AB",
        dueDate: { month: "Sep", day: 10, time: "11:59PM" },
      },
      {
        type: "grade",
        title: "A New Grade Was Posted",
        text: "Mr. Miller Posted a new Grade for the assignment 'Test for concavity'",
        score: { pointsGotten: 8, maxPoints: 10 },
      },
      {
        type: "grade",
        title: "A New Grade Was Posted",
        text: "Mr. Miller Posted a new Grade for the assignment 'Test for concavity'",
        score: { pointsGotten: 8, maxPoints: 10 },
      },{
        type: "grade",
        title: "A New Grade Was Posted",
        text: "Mr. Miller Posted a new Grade for the assignment 'Test for concavity'",
        score: { pointsGotten: 8, maxPoints: 10 },
      },
    ],
  };

  return (
    <>
      <Navbar
        bg="dark"
        buttons={["Practice", "Classes", "Resources", "Post Questions"]}
      />
      <section className={styles.topSection}>
        <div className={styles.leftContent}>
          <div className={styles.userTitleWrapper}>
            <h1 className={styles.userTitle}>
              Welcome Back <br />
            </h1>
            <h1 className={styles.usernameTitle}>{user.userName}</h1>
          </div>
        </div>

        <div className={styles.assignmentsContainer}>
          <AssignmentList assignments={user.assignments} />
        </div>
      </section>

        <img className={styles.waves} src={waves} alt="" />
      <div className={styles.waveTransition}>
        <div className={styles.bottomSection}>
          <div className={styles.mathematicianBackground}>
            <div className={styles.mathematicianWrapper}>
              <div className={styles.mathematicianHeader}>
                <h2 className={styles.mathematicianTitle}>Euler Leonhard</h2>
              </div>
              <div className={styles.mathematicianBody}>
                <img className={styles.mathImage} src={eulerImage} alt="" />
                <p className={styles.mathematicianAbout}>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Mi sociosqu
                  mollis imperdiet interdum penatibus ex tincidunt. Primis
                  placerat in viverra, vivamus suscipit phasellus. Potenti aliquet
                  efficitur vivamus congue nibh aliquam maximus? Vestibulum
                  vulputate luctus libero dolor tempus nec. Commodo in varius
                  fringilla rhoncus libero. Habitant egestas commodo ullamcorper
                  ipsum vehicula taciti eros facilisis. Diam arcu id lacinia
                  tristique elementum sapien. Lacus erat mauris efficitur maecenas
                  hendrerit conubia turpis vel habitasse. Massa maximus fames in
                  integer libero facilisis. Class elementum fusce finibus;
                  interdum hac vel orci. Ex ante pulvinar tristique vitae
                  curabitur ligula; arcu nec volutpat. Consectetur magnis
                  hendrerit tempor dictum porttitor. Torquent sapien nascetur urna
                  nec aliquet, a ridiculus fames. Nibh ridiculus sed sollicitudin
        
                </p>
              </div>
              <div className={styles.mathematicianQuotes}>
                <Quote quoteText="some bullshit" author="-Adam"></Quote>
              </div>
            </div>
          </div>
          <div className={styles.notificationsBackground}>
            <div className={styles.notificationsWrapper}>
              <div className={styles.notificationsTitleWrapper}>
                <h1 className={styles.notificationsTitle}>Notifications</h1>
                <div className={styles.titleDivideBar}></div>
              </div>
              <div className={styles.notifications}>
                {user.notifications.map((notification) => {
                  if (notification.type === "question") {
                    return (
                      <div className={styles.notification}>
                        <div className={styles.notificationHeader}>
                          <h2 className={styles.notificationTitle}>
                            {notification.title}
                          </h2>
                          <button className={styles.viewPostButton}>View</button>
                        </div>
                        <div className={styles.notificationFooter}>
                          <p className={styles.notificationText}>
                            {notification.text}
                          </p>
                        </div>
                      </div>
                    );
                  } else if (notification.type === "assignment") {
                    return (
                      <div className={styles.notification}>
                        <div className={styles.notificatonHeader}>
                          <h2 className={styles.notificationTitle}>
                            {notification.title}
                          </h2>
                        </div>
                        <div className={styles.notificationBody}>
                          <p className={styles.notificationText}>
                            {notification.text}
                          </p>
                        </div>
                        <div className={styles.notificationFooter}>
                          <p className={styles.notificationDueDate}>
                            Due: {notification.dueDate.month}.{" "}
                            {notification.dueDate.day} |{" "}
                            {notification.dueDate.time}
                          </p>
                          <p className={styles.notificationClass}>
                            Class: {notification.class}
                          </p>
                        </div>
                      </div>
                    );
                  } else if (notification.type === "grade") {
                    return (
                      <div className={styles.notification}>
                        <div className={styles.notificationHeader}></div>
                        <div className={styles.notificationBody}>
                          <div className={styles.notificationTextWrapper}>
                            <h2 className={styles.notificationTitle}>
                              {notification.title}
                            </h2>
                            <p className={styles.notificationText}>
                              {notification.text}
                            </p>
                          </div>
                          <div className={styles.notificationGradeWrapper}>
                            <div className={styles.notificationGrade}>
                              <p className={styles.numerator}>
                                {notification.score.pointsGotten}
                              </p>
                              <div className={styles.gradeLine}></div>
                              <p className={styles.denominator}>
                                {notification.score.maxPoints}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLanding;
