import styles from "./notification-area.module.css";
import shortenString from "../helpers/shortenText.js";
import {Show} from "solid-js"

// Notifications is a getter
function NotificationArea({notifications}){
  return (
    <div className={styles.notificationAreaBackground}>
      <div className={styles.notificationArea}>
        <h1 className={styles.notificationsTitle}>Notifications</h1>
        <div className={styles.notifications}>
          {notifications().reverse().map(notification => {
            return (
              <div className={styles.notification}>
                <div className={styles.notificationHead}>
                  <h2 className={styles.notificationTitle}>
                    {notification.title}
                  </h2>
                  <p className={styles.timeStamp}>{notification.timestamp}</p>
                </div>

                <div className={styles.notificationBody}>
                  <p className={styles.notificationText}>{notification.text}</p>
                  <Show
                    when={notification.max_grade && notification.actual_grade}
                  >
                    <div className={styles.gradeWrapper}>
                      <div className={styles.grade}>
                        <p className={styles.numerator}>
                          {notification.actual_grade}
                        </p>
                        <div className={styles.divideLine}></div>
                        <p className={styles.denominator}>
                          {notification.max_grade}
                        </p>
                      </div>
                    </div>
                  </Show>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )

}

export default NotificationArea;
