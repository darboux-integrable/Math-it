import styles from "./classrooms-page.module.css";
import SideNavbar from "./SideNavbar";
import ClassroomsList from "./ClassroomsList";
import { createSignal, Show} from "solid-js";
import ImageFileInput from "./ImageFileInput";
import imageIcon from "../assets/image-outline.svg";

function ClassroomPage({ id }) {
  let newClassroomWrapper; 
  let blanket; 

  const [newClassroom, setNewClassroom] = createSignal(false);

  const [imgSrc, setImgSrc] = createSignal(imageIcon);
  const [title, setTitle] = createSignal("");
  const [instructorName, setInstructorName] = createSignal("");
  const [period, setPeriod] = createSignal("");
  const [startDate, setStartDate] = createSignal("");
  const [endDate, setEndDate] = createSignal("");

  const classrooms = [
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
    {
      image: "/src/assets/temp/4.jpg",
      endDate: "Feb. 28th 2025",
      title: "Hist 101: Intro U.S. History",
      teacher: "Mr. Robert",
      startDate: "Dec. 15th 2024",
      passed: false,
    },
  ];

  const createClassroom = () => {
    fetch("http://127.0.0.1:5000/classrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacher: instructorName(),
        image: JSON.stringify(imgSrc()),
        start_date: startDate(),
        end_date: endDate(),
        period: period(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <Show when={newClassroom()}>
          <div ref={blanket} className={styles.blanket}></div>
        </Show>
        <h1 className={styles.classroomsPageTitle}>Your Classrooms</h1>

        <div>
          <div className={styles.currentListContainer}>
            <ClassroomsList classrooms={classrooms} />
          </div>
          <div className={styles.teacherButtonsContainer}>
            <button
              className={`${styles.createClassroomButton} ${styles.teacherButton}`}
              onclick={() => {
                setNewClassroom(true);
              }}
            >
              Create New Classroom
            </button>
            <button
              className={`${styles.deleteClassroomButton} ${styles.teacherButton}`}
            >
              Delete Existing Classroom
            </button>
          </div>
        </div>

        <Show when={newClassroom()}>
          <div ref={newClassroomWrapper} className={styles.newClassroomWrapper}>
            <h1 className={styles.newClassroomTitle}>New Classroom</h1>
            <div className={styles.basicClassInfo}>
              <div className={styles.first3Inputs}>
                <ImageFileInput setImageSrc={setImgSrc} getImageSrc={imgSrc} />
                <div className={styles.titleAndTeacher}>
                  <div>
                    <p className={styles.inputTitle}>Title</p>
                    <input
                      type="text"
                      className={styles.newClassInput}
                      value={title()}
                      oninput={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Enter The Title of the Class"
                    />
                  </div>
                  <div>
                    <p className={styles.inputTitle}>Instructor's Name</p>
                    <input
                      type="text"
                      className={styles.newClassInput}
                      value={instructorName()}
                      oninput={(e) => {
                        setInstructorName(e.target.value);
                      }}
                      placeholder="Enter the Instructor's Name"
                    />
                  </div>
                  <div>
                    <p className={styles.inputTitle}>Period</p>
                    <input
                      type="text"
                      value={period()}
                      oninput={(e) => {
                        setPeriod(e.target.value);
                      }}
                      className={styles.newClassInput}
                      placeholder="Enter the Period"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.otherInputs}>
                <div>
                  <p className={styles.inputTitle}>Start Date</p>
                  <input
                    type="date"
                    value={startDate()}
                    oninput={(e) => {
                      setStartDate(e.target.value);
                    }}
                    className={styles.newClassInput}
                    placeholder="Enter the End Date"
                  />
                </div>
                <div>
                  <p className={styles.inputTitle}>End Date</p>
                  <input
                    type="date"
                    value={endDate()}
                    onInput={(e) => {
                      setEndDate(e.target.value);
                    }}
                    className={styles.newClassInput}
                    placeholder="Enter the Period"
                  />
                </div>
              </div>
            </div>

            <div className={styles.createButtonWrapper}>
              <button
                className={styles.createNewClassButton}
                onclick={() => {
                  createClassroom();
                }}
              >
                Done!
              </button>

              <button
                className={styles.createNewClassButton}
                onclick={() => {

                  newClassroomWrapper.className += " " + styles.slideDown;
                  blanket.className += " " + styles.fadeOut;

                  setTimeout(() => {setNewClassroom(false)}, 200);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default ClassroomPage;
