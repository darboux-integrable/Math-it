import styles from "./assignment-list.module.css";
import { Show } from "solid-js";

function AssignmentList({ assignments }) {
  return (
    <div className={styles.assignmentBackground}>
      <div className={styles.assignmentsWrapper}>
        <div className={styles.assignmentsTitleWrapper}>
          <h1 className={styles.assignmentsTitle}>Assignments</h1>
          <div className={styles.titleBorder}></div>
        </div>
        <div className={styles.assignments}>
          <Show when={assignments.length > 0}>
            {assignments.map((assignment) => {
              return (
                <div className={styles.assignment}>
                  <div className={styles.dueDateWrapper}>
                    <p className={styles.monthText}>
                      {assignment.dueDate.month}
                    </p>
                    <div className={styles.divideBar}></div>
                    <p className={styles.dayText}>{assignment.dueDate.day}</p>
                  </div>
                  <div className={styles.rightContent}>
                    <div className={styles.rightContentWrapper}>
                      <p className={styles.timeText}>
                        {assignment.dueDate.time}
                      </p>
                      <p className={styles.periodText}>
                        {assignment.period} | {assignment.teacher}
                      </p>
                    </div>
                    <div className={styles.titleWrapper}>
                      <h2 className={styles.assignmentTitle}>
                        {assignment.title.length > 15
                          ? assignment.title.substring(0, 15) + "..."
                          : assignment.title}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </Show>
          <Show when={assignments.length == 0}>
            <p className={styles.noAssignmentsText}>
              You currently do not have any assignments.
            </p>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default AssignmentList;
