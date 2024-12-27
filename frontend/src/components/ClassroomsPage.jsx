import styles from "./classrooms-page.module.css";
import SideNavbar from "./SideNavbar";
import ClassroomsList from "./ClassroomsList";
import { createSignal, Show } from "solid-js";
import ImageFileInput from "./ImageFileInput";
import imageIcon from "../assets/image-outline.svg";
import checkFilled from "../helpers/checkForFilledInputs";
import { fetchUserFromCookie } from "../helpers/userInSession.js";

function ClassroomLandingPage() {
  let newClassroomWrapper;
  let joinClassroomWrapper;
  let blanket;

  const [newClassroom, setNewClassroom] = createSignal(false);
  const [user, setUser] = createSignal({});
  const [classrooms, setClassrooms] = createSignal(false);
  const [classesTaught, setClassesTaught] = createSignal(false);
  const [error, setError] = createSignal("");

  const [imgSrc, setImgSrc] = createSignal(imageIcon);
  const [title, setTitle] = createSignal("");
  const [instructorName, setInstructorName] = createSignal("");
  const [period, setPeriod] = createSignal("");
  const [startDate, setStartDate] = createSignal("");
  const [endDate, setEndDate] = createSignal("");

  const [classroomId, setClassroomID] = createSignal("");
  const [joinClassroom, setJoinClassroom] = createSignal(false);

  const createClassroom = () => {
    fetch("http://127.0.0.1:5000/classrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacher: instructorName(),
        teacher_id: user()._id,
        image: JSON.stringify(imgSrc()),
        start_date: startDate(),
        end_date: endDate(),
        title: title(),
        period: period(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const getAllClassroomsByUser = () => {
    fetch("http://127.0.0.1:5000/classrooms/all_classrooms/" + user()._id)
      .then((res) => res.json())
      .then((data) => {
        setClassrooms(data);
      });
  };

  const addStudentToClass = () => {
    fetch(
      `http://127.0.0.1:5000/classrooms/add_student?user_id=${
        user()._id
      }&classroom_id=${encodeURIComponent(classroomId())}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      })
      .catch((err) => {
        setError("No Classroom Found with that Code");
      });
  };
  const checkIfAlreadyEnrolled = (classId) => {
    for (let i = 0; i < classrooms().length; i++) {
      if (classrooms()[i]._id == classId) {
        return true;
      }
    }
    return false;
  };
  const getAllClassesTaught = () => {
    fetch("http://127.0.0.1:5000/classrooms/taught_by/" + user()._id)
      .then((res) => res.json())
      .then((data) => {
        setClassesTaught(data);
      });
  };

  fetchUserFromCookie((data) => {
    setUser(data);
    getAllClassroomsByUser();
    getAllClassesTaught();
  });

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <Show when={newClassroom() || joinClassroom()}>
          <div ref={blanket} className={styles.blanket}></div>
        </Show>
        <h1 className={styles.classroomsPageTitle}>Your Classrooms</h1>

        <div>
          <div className={styles.currentListContainer}>
            <Show when={classrooms()}>
              <ClassroomsList
                classrooms={classrooms()}
                title="Enrolled Classes"
                type="learner"
              />
            </Show>
          </div>
          <button
            className={styles.classroomButton}
            onclick={() => {
              setJoinClassroom(true);
            }}
          >
            Join An Existing Class
          </button>

          {/* Make it so only teachers can create and delete classrooms */}
          <Show when={user() && user().account_type == "educator"}>
            <div className={styles.currentListContainer}>
              <Show when={classesTaught()}>
                <ClassroomsList
                  classrooms={classesTaught()}
                  title="Classes You Teach"
                  type="educator"
                />
              </Show>
            </div>
            <div className={styles.teacherButtonsContainer}>
              <button
                className={styles.classroomButton}
                onclick={() => {
                  setNewClassroom(true);
                }}
              >
                Create New Classroom
              </button>
              {/* Might Make Later  */}
              {/* <button
                className={`${styles.deleteClassroomButton} ${styles.teacherButton}`}
              >
                Delete Existing Classroom
              </button> */}
            </div>
          </Show>
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
                  if (
                    checkFilled(
                      instructorName(),
                      startDate(),
                      endDate(),
                      title(),
                      period()
                    )
                  ) {
                    newClassroomWrapper.className += " " + styles.slideDown;
                    blanket.className += " " + styles.fadeOut;

                    setTimeout(() => {
                      setNewClassroom(false);
                      setError("");
                    }, 200);
                    createClassroom();
                  } else {
                    setError("Not All input boxes are filled.");
                  }
                }}
              >
                Done!
              </button>

              <button
                className={styles.createNewClassButton}
                onclick={() => {
                  newClassroomWrapper.className += " " + styles.slideDown;
                  blanket.className += " " + styles.fadeOut;

                  setTimeout(() => {
                    setNewClassroom(false);
                    setError("");
                  }, 200);
                }}
              >
                Back
              </button>
            </div>
            <div className={styles.errorSection}>
              <Show when={error()}>
                <p className={styles.errorMessage}>{error()}</p>
              </Show>
            </div>
          </div>
        </Show>
        <Show when={joinClassroom()}>
          <div
            ref={joinClassroomWrapper}
            className={styles.joinClassroomContainer}
          >
            <h1 className={styles.joinTitle}>Join An Existing Class</h1>
            <p className={styles.joinLabel}>Class Code</p>
            <input
              type="text"
              className={styles.joinInput}
              value={classroomId()}
              onInput={(e) => setClassroomID(e.target.value)}
            />
            <div className={styles.joinButtons}>
              <button
                className={styles.joinButton}
                onclick={() => {
                  if (!checkFilled(classroomId())) {
                    setError("Please Enter Class Code");
                  } else if (checkIfAlreadyEnrolled(classroomId())) {
                    setError("You are Already Enrolled In This Class");
                  } else if(error() == ""){
                    joinClassroomWrapper.className += " " + styles.slideDown;
                    blanket.className += " " + styles.fadeOut;
                    setTimeout(() => {
                      setJoinClassroom(false);
                    }, 200);
                    setError("");
                    addStudentToClass();
                  }
                }}
              >
                Done
              </button>
              <button
                className={styles.joinButton}
                onclick={() => {
                  joinClassroomWrapper.className += " " + styles.slideDown;
                  blanket.className += " " + styles.fadeOut;
                  setTimeout(() => {
                    setJoinClassroom(false);
                  }, 200);
                  setError("");
                }}
              >
                Back
              </button>
            </div>
            <Show when={error() != ""}>
              <p className={styles.errorMessage}>{error()}</p>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default ClassroomLandingPage;
