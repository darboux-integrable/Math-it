import { createSignal, Show } from "solid-js";
import styles from "./math-help-page.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";
import tagsJSON from "../json/tags.json";
import { getCookieValue } from "../helpers/userInSession";
import checkFilled from "../helpers/checkForFilledInputs";
import { formateTime, formateDate } from "../helpers/dateFormatter";

export default function MathHelpPage() {
  let tagsList = tagsJSON.tags;
  tagsList.splice(0, 1);

  const [title, setTitle] = createSignal("");
  const [body, setBody] = createSignal("");

  const [tags, setTags] = createSignal("");

  const [error, setError] = createSignal("");

  let user;

  fetch(`http://127.0.0.1:5000/users/${getCookieValue("userID")}`)
    .then((res) => res.json())
    .then((data) => {
      user = data;
    });

  const sendToTutors = async () => {
    const tutorsListResponse = await fetch(
      "http://127.0.0.1:5000/users/find_tutors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: tags(),
        }),
      }
    );

    const tutorList = await tutorsListResponse.json();

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const timeStamp =
      formateDate(`${year}-${month + 1}-${day}`) +
      " at " +
      formateTime(hours, minutes);

    let tutor_ids = tutorList.map(tutor => tutor._id);

    const notificationResponse = await fetch(
      "http://127.0.0.1:5000/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `${user.username} Wants Help`,
          timestamp: timeStamp,
          text: `${user.username} asked: ${title()}`,
          recipients: tutor_ids,
        }),
      }
    );

    const sendQuestionResponse = await fetch("http://127.0.0.1:5000/users/add_tutor_question", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tutors: tutor_ids,
            question: body(),
            title: title(),
            asked_by: user.username
        })
    })

    location.replace("/practice");
  };

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Ask a Tutor</h1>
        <div className={styles.inputSection}>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Title</p>
            <input
              type="text"
              value={title()}
              oninput={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Question</p>
            <TextArea currentText={body} setCurrentText={setBody} />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputTitle}>Select Tags</p>
            <div className={styles.tagsSection}>
              {tagsList.map((tag) => {
                const [active, setActive] = createSignal(false);

                return (
                  <div
                    className={styles.tagButton}
                    onclick={() => {
                      setActive(!active());

                      if (active() && !tags().includes(tag.name)) {
                        setTags([...tags(), tag.name]);
                      } else if (!active()) {
                        tags().splice(tags().indexOf(tag.name), 1);
                      }
                    }}
                    style={{
                      "background-color": !active()
                        ? "var(--dark-1)"
                        : "transparent",
                    }}
                  >
                    <div
                      className={styles.tagBackground}
                      style={{ "background-color": tag.color }}
                    ></div>
                    <p className={styles.tagName}>{tag.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.doneButtonWrapper}>
          <button
            className={styles.doneButton}
            onclick={() => {
              if (tags().length == 0) {
                setError("No Tags Selected");
                return;
              }

              if (!checkFilled(title(), body())) {
                setError("Not All Inputs Were Filled");
                return;
              }

              sendToTutors();
            }}
          >
            Done
          </button>
        </div>

        <Show when={error()}>
          <p className={styles.errorText}>{error()}</p>
        </Show>
      </div>
    </div>
  );
}
