import styles from "./discussion-page.module.css";
import { useParams } from "@solidjs/router";
import Navbar from "./Navbar";
import { getCookieValue } from "../helpers/userInSession";
import { createSignal, Show } from "solid-js";
import checkFilled from "../helpers/checkForFilledInputs.js"
import { compileText } from "./TextAreaPreview";
import { formateDate, formateTime } from "../helpers/dateFormatter";
import TextArea from "./TextArea";

function DiscussionPage({ accountType }) {
  const params = useParams();
  const classroomId = params.id;
  const discussionId = params.discussionId;

  const classroomPath = accountType == "educator" ? "educator" : "";

  const userId = getCookieValue("userID")

  let user;

  const [discussion, setDiscussion] = createSignal(false);
  const [addPost, setAddPost] = createSignal(false);

  const [postTitle, setPostTitle] = createSignal("");
  const [postText, setPostText] = createSignal("");

  const [error, setError] = createSignal("");

  const getUser = () => {
    fetch(`http://127.0.0.1:5000/users/${userId}`)
    .then(res => res.json())
    .then(userData => {
      user = userData;
    })
  }

  const addPostToDiscussion = () => {
    const date = new Date();

    fetch(`http://127.0.0.1:5000/discussions/${discussionId}/post`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: postTitle(),
        text: postText(),
        post_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        post_time: `${date.getHours()}:${date.getMinutes()}`,
        name: user.first_name + " " + user.last_name,
        max_points: discussion().max_points,
      })
    })
    .then(res => res.json())
    .then(data => {
      location.reload();
    })
  }

  fetch(`http://127.0.0.1:5000/discussions/${discussionId}`)
    .then((res) => res.json())
    .then((discussionData) => {
      setDiscussion(discussionData);
    });

  getUser();

  return (
    <>
      <Navbar
        buttons={[
          {
            text: "Course Home",
            location: `/classrooms/${classroomId}/${classroomPath}`,
          },
          {
            text: "Assignments",
            location: `/classrooms/${classroomId}/${classroomPath}/assignments`,
          },
          {
            text: "Discussions",
            location: `/classrooms/${classroomId}/${classroomPath}/discussions`,
          },
          {
            text: "Grades",
            location: `/classrooms/${classroomId}/${classroomPath}/grades`,
          },
        ]}
        bg="dark"
      />

      <div className={styles.pageContent}>
        <Show when={discussion()}>
          <div className={styles.discussion}>
            <h1 className={styles.pageTitle}>{discussion().title}</h1>
            <p className={styles.discussionBody}>
              {compileText(discussion().text)}
            </p>
            <button
              className={styles.newPostButton}
              onclick={() => setAddPost(!addPost())}
            >
              Add a Post!
            </button>
          </div>

          <Show when={addPost()}>
            <div className={styles.addPostSection}>
              <div className={styles.inputWrapper}>
                <p className={styles.inputTitle}>Title</p>
                <input
                  type="text"
                  className={styles.input}
                  value={postTitle()}
                  oninput={(e) => {
                    setPostTitle(e.target.value);
                  }}
                />
              </div>
              <div className={styles.inputWrapper}>
                <p className={styles.inputTitle}>Body</p>
                <TextArea currentText={postText} setCurrentText={setPostText} />
              </div>
              <button className={styles.addPostButton} onclick={() => {
                if(checkFilled(postText(), postTitle())){
                  addPostToDiscussion();
                } else {
                  setError("Not All inputs are filled.")
                }
              }}>Add Post!</button>

              <Show when={error() != ""}>
                <p className={styles.errorText}>{error()}</p>
              </Show>

            </div>
          </Show>

          <div className={styles.postTable}>
            {discussion().posts.map((post) => {
              const [grade, setGrade] = createSignal("");
              const timeSplit = post.post_time.split(":");
              const hours = timeSplit[0];
              const minutes = timeSplit[1];
              return (
                <div className={styles.post}>
                  <div className={styles.postTop}>
                    <div
                      className={styles.postLeft}
                      onclick={() => {
                        location.replace(
                          `/classrooms/${classroomId}/educator/discussions/${discussionId}/${post._id}`
                        );
                      }}
                    >
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postBody}>
                        {compileText(post.text)}
                      </p>
                    </div>
                    <div className={styles.postRight}>
                      <Show
                        when={
                          accountType == "educator" &&
                          post.name != user.first_name + " " + user.last_name
                        }
                      >
                        <div className={styles.postGradeWrapper}>
                          <div className={styles.gradeWrapper}>
                            <input
                              type="number"
                              value={grade()}
                              placeholder="-----"
                              className={styles.gradeInput}
                              oninput={(e) => setGrade(e.target.innerText)}
                            />
                            <p className={styles.divideLine}>/</p>
                            <h3 className={styles.maxPointsText}>
                              {discussion().max_points}
                            </h3>
                          </div>
                          <button className={styles.submitGradeButton}>
                            Submit Grade
                          </button>
                        </div>
                      </Show>
                    </div>
                  </div>
                  <div
                    className={styles.postBottom}
                    onclick={() => {
                      location.replace(
                        `/classrooms/${classroomId}/educator/discussions/${discussionId}/${post._id}`
                      );
                    }}
                  >
                    <p className={styles.postedDetailsText}>
                      Posted By {post.name} on {formateDate(post.post_date)} at{" "}
                      {formateTime(hours, minutes)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Show>
        {() => {
          discussion()
          MathJax.typeset();
        }}
      </div>
    </>
  );
}

export default DiscussionPage;
