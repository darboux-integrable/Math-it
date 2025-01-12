import { createSignal } from "solid-js";
import styles from "./create-classroom-discussion-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import checkFilled from "../helpers/checkForFilledInputs";
import { formateDate, formateTime } from "../helpers/dateFormatter";

function CreateClassroomDiscussionPage() {
  const params = useParams();
  const classroomId = params.id;

  const [title, setTitle] = createSignal("");
  const [dueDate, setDueDate] = createSignal("");
  const [text, setText] = createSignal("");
  const [dueTime, setDueTime] = createSignal("");
  const [error, setError] = createSignal("");
  const [maxPoints, setMaxPoints] = createSignal("");

  let classroom;

  fetch(`http://127.0.0.1:5000/classrooms/${classroomId}`)
    .then((res) => res.json())
    .then((data) => {
      classroom = data;
    });

  const createDiscussion = () => {
    fetch("http://127.0.0.1:5000/discussions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title(),
        text: text(),
        due_date: dueDate(),
        due_time: dueTime(),
        max_points: maxPoints(),
        classroom_id: classroomId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        createNotification();
      });
  };

  const createNotification = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();

    const assignmentHours = dueTime().split(":")[0];
    const assignmentMinutes = dueTime().split(":")[1];

    fetch(`http://127.0.0.1:5000/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Discussion Posted",
        timestamp:
          formateDate(`${year}-${month}-${day}`) +
          " at " +
          formateTime(hours, minutes),
        text: `${
          classroom.teacher
        } created a new discussion: ${title()} due on ${formateDate(
          dueDate()
        )} at ${formateTime(assignmentHours, assignmentMinutes)}`,
        recipients: classroom.students,
        class_id: classroom._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        location.replace(`/classrooms/${classroomId}/educator/discussions`);
      });
  };

  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Course Home",
            location: `/classrooms/${classroomId}/educator/`,
          },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/educator/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/educator/discussions`,
          },
          {
            text: "Grades",
            location: `/classrooms/${classroomId}/educator/grades`,
          },
        ]}
        bg="dark"
      />

      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Create Discussion</h1>

        <div className={styles.inputsWrapper}>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Title</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Title"
              value={title()}
              oninput={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Total Points</p>
            <input
              className={styles.input}
              type="Number"
              placeholder="Enter Total Number Of Points"
              value={maxPoints()}
              oninput={(e) => setMaxPoints(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Due Date</p>
            <input
              type="date"
              className={styles.input}
              value={dueDate()}
              oninput={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Due Time</p>
            <input
              type="time"
              className={styles.input}
              value={dueTime()}
              oninput={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <p className={styles.inputTitle}>Discussion Body</p>
          <TextArea currentText={text} setCurrentText={setText} />
        </div>

        <button
          className={styles.createButton}
          onclick={() => {
            if (checkFilled(text(), title(), dueDate(), dueTime())) {
              createDiscussion();
            } else {
              setError("Not All Inputs are Filled!");
            }
          }}
        >
          Create!
        </button>

        <Show when={error() != ""}>
          <p className={styles.errorText}>{error()}</p>
        </Show>
      </div>
    </>
  );
}

export default CreateClassroomDiscussionPage;
