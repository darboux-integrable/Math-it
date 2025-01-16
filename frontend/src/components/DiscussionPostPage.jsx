import { useParams } from "@solidjs/router";
import styles from "./discussion-post-page.module.css";
import Navbar from "./Navbar";
import { createSignal, Show } from "solid-js";
import { formateDate, formateTime } from "../helpers/dateFormatter";
import TextArea from "./TextArea";
import { getCookieValue } from "../helpers/userInSession";
import { compileText } from "./TextAreaPreview";

function DiscussionPostPage({ accountType }) {
  const classroomPath = accountType == "educator" ? "educator" : "learner";

  const params = useParams();
  const classroomId = params.id;
  const discussionId = params.discussionId;
  const postId = params.postId;

  const [post, setPost] = createSignal(false);
  const [discussion, setDiscussion] = createSignal(false);
  const [comments, setComments] = createSignal(false);

  let user;

  const [toggleCreateReply, setToggleCreateReply] = createSignal(false);
  const [replyText, setReplyText] = createSignal("");

  let hours, minutes;

  fetch(`http://127.0.0.1:5000/users/${getCookieValue("userID")}`)
    .then((res) => res.json())
    .then((userData) => {
      user = userData;
    });

  fetch(`http://127.0.0.1:5000/discussions/${discussionId}`)
    .then((res) => res.json())
    .then((discussionData) => {
      setDiscussion(discussionData);
    });

  fetch(`http://127.0.0.1:5000/discussions/posts/${postId}`)
    .then((res) => res.json())
    .then((postData) => {
      setPost(postData);
      let timeSplit = postData.post_time.split(":");

      hours = timeSplit[0];
      minutes = timeSplit[1];
      getComments();
    });

  function getComments() {
    fetch(`http://127.0.0.1:5000/user_comments/get_all_comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_ids: post().replies }),
    })
      .then((res) => res.json())
      .then((commentsArray) => {
        setComments(commentsArray);
      });
  }

  function createReply() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    fetch(
      `http://127.0.0.1:5000/user_comments/classroom_discussion/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.first_name + " " + user.last_name,
          post_date_and_time:
            formateDate(
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            ) + ` ${formateTime(hours, minutes)}`,
          text: replyText(),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      });
  }

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
        <Show when={post() && discussion()}>
          <div className={styles.userInformation}>
            <h1 className={styles.discussionTitle} onclick={() => {location.replace(
              `/classrooms/${classroomId}/${classroomPath}/discussions/${discussionId}`
            );}}>{discussion().title}</h1>
            <p className={styles.userDetails}>
              {post().name} posted on {formateDate(post().post_date)} at{" "}
              {formateTime(hours, minutes)}
            </p>
          </div>

          <div className={styles.post}>
            <p className={styles.postText}>{compileText(post().text)}</p>

            <button
              className={styles.replyButton}
              onclick={() => {
                setToggleCreateReply(!toggleCreateReply());
              }}
            >
              Reply
            </button>
          </div>
        </Show>

        <Show when={toggleCreateReply()}>
          <h1 className={styles.createReplyTitle}>Create Reply</h1>
          <TextArea currentText={replyText} setCurrentText={setReplyText} />
          <button
            className={styles.replyButton}
            onclick={() => {
              createReply();
            }}
          >
            Done
          </button>
        </Show>

        <Show when={comments()}>
          <div className={styles.commentsTable}>
            {comments().map((comment) => {
              return (
                <div className={styles.comment}>
                  <div className={styles.commentDetails}>
                    <h3 className={styles.usersName}>{comment.name}</h3>
                    <p className={styles.postTime}>
                      {comment.post_date_and_time}
                    </p>
                  </div>

                  <div className={styles.commentWrapper}>
                    <p className={styles.commentText}>{compileText(comment.text)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Show>
          {() => {
            // IDK Why I need to use both of them but I do
            // So either when the dicussion or comments update, 
            // the mathjax will typeset again
            discussion();
            comments();
            MathJax.typeset();
          }}
      </div>
    </>
  );
}

export default DiscussionPostPage;
