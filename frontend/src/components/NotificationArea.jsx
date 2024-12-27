import styles from "./notification-area.module.css";
import shortenString from "../helpers/shortenText.js";

function NotificationArea({ notifications }) {
  return (
    <div className={styles.notificationBackground}>
      <div className={styles.notificationsSection}>
        <div className={styles.notificationsHeader}>
          <h1 className={styles.notificationsTitle}>Notifications</h1>
        </div>
        <div className={styles.notificationsBody}>
            {notifications().length == 0
              ? "You currently do not have any notifications"
              : notifications().map((notification) => {
                  return getNotificationElement(notification);
                })}
        </div>
      </div>
    </div>
  );
}

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

export default NotificationArea;
