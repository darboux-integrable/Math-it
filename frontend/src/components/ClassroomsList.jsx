import styles from "./classrooms-list.module.css";
import { createSignal } from "solid-js";
import ClassroomCard from "./ClassroomCard";

function ClassroomsList(props) {
  const classrooms = () => props.classrooms;

  const location_base = props.type == "educator" ? "/classrooms/educator/" : "/classrooms/";

  return (
      <div className={styles.content}>
        <h2 className={styles.listTitle}>{props.title}</h2>
        <div className={styles.currentClassesList}>
          {
          classrooms().length == 0 ? <p className={styles.noClassesText}>You are not currently enrolled in any classes</p> : classrooms().map((classroom) => {
            return (
              <ClassroomCard
                imgSrc={classroom.image}
                endDate={classroom.end_date}
                title={classroom.title}
                startDate={classroom.start_date}
                teacher={classroom.teacher}
                passed={classroom.passed}
                locationString = {location_base + classroom._id}
              />
            );
          })}
        </div>
    </div>
  );
}

export default ClassroomsList;
