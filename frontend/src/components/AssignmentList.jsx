import styles from "./assignment-list.module.css";
import { Show } from "solid-js";
import { getMonth } from "../helpers/dateFormatter.js";

/**
 * This UI Component takes in a list of assignments and takes out a formatted display of them. 
 * If there are currently no assignments, the display changes to reflect that. 
 */
function AssignmentList({ assignments }) {
  return (
    <div className={styles.assignmentBackground}>
      <div className={styles.assignmentsWrapper}>
        <div className={styles.assignmentsTitleWrapper}>
          <h1 className={styles.assignmentsTitle}>Assignments</h1>
          <div className={styles.titleBorder}></div>
        </div>
        <div className={styles.assignments}>
          <Show when={assignments().length > 0}>
            {assignments().map((assignment) => {
              const dateSplit = assignment.due_date.split("-");
              return (
                <div className={styles.assignment}>
                  <div className={styles.dueDateWrapper}>
                    <p className={styles.monthText}>
                      {getMonth(parseInt(dateSplit[1]))}
                    </p>
                    <div className={styles.divideBar}></div>
                    <p className={styles.dayText}>{dateSplit[2]}</p>
                  </div>
                  <div className={styles.rightContent}>
                    <div className={styles.rightContentWrapper}>
                      <p className={styles.timeText}>
                        {assignment.due_time}
                      </p>
                      <p className={styles.periodText}>
                        {assignment.period} | {assignment.teacher}
                      </p>
                    </div>
                    <div className={styles.titleWrapper}>
                      <h2 className={styles.assignmentTitle}>
                        {/* If an assigment's name is over 15 characters, shorten it to conserve space on the page. */}
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
          {/* Display a message for when there are no assignments. */}
          <Show when={assignments().length == 0}>
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
