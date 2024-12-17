import styles from "./classrooms-list.module.css";
import { createSignal } from "solid-js";
import ClassroomCard from "./ClassroomCard";

function ClassroomsList(props) {
  const classrooms = () => props.classrooms;

  return (
      <div className={styles.content}>
        <h2 className={styles.listTitle}>Current Classes</h2>
        <div className={styles.currentClassesList}>
          {classrooms().map((classroom) => {
            return (
              <ClassroomCard
                imgSrc={classroom.image}
                endDate={classroom.endDate}
                title={classroom.title}
                startDate={classroom.startDate}
                teacher={classroom.teacher}
                passed={classroom.passed}
              />
            );
          })}
        </div>
    </div>
  );
}

export default ClassroomsList;
