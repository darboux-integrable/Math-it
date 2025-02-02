import { createSignal, Show } from "solid-js";
import UserComment from "./UserComment";
import TextArea from "./TextArea";
import styles from "./comment-section.module.css";
import checkFilled from "../helpers/checkForFilledInputs";
import { formateDate, formateTime } from "../helpers/dateFormatter";
import { getCookieValue } from "../helpers/userInSession";

function CommentSection({ commentType, comments, commmentButtonTheme, questionId }) {
  let user;
  fetch(`http://127.0.0.1:5000/users/${getCookieValue("userID")}`)
    .then((res) => res.json())
    .then((userData) => {
      user = userData;
    });

  const addComment = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const dateString = `${year}-${month}-${day}`;

    fetch(`http://127.0.0.1:5000/user_comments/${commentType}/${questionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText(),
        post_date_and_time:
          formateDate(dateString) + " at " + formateTime(hours, minutes),
        user_name: user.username,
        votes: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        location.reload();
      });
  };

  const [addCommentSection, setAddCommentSection] = createSignal(false);
  const [commentText, setCommentText] = createSignal("");

  const [error, setError] = createSignal("");

  return (
    <div className={styles.commentsWrapper}>
      {/* A Comment has a vote, text, user, and date */}
      <div className={styles.allComments}>
        {comments.map((comment) => {
          return (
            <UserComment
              commentBody={comment.text}
              user={comment.user_name}
              dateAsked={comment.post_date_and_time}
            />
          );
        })}
      </div>
      <button
        className={`${
          commmentButtonTheme == "notPrimary"
            ? styles.notPrimaryButton
            : styles.addComment
        }`}
        onclick={() => {
          setAddCommentSection(true);
        }}
      >
        Add a Comment
      </button>

      <Show when={addCommentSection()}>
        <div className={styles.addCommentWrapper}>
          <h1 className={styles.addCommentTitle}>Add Comment:</h1>
        </div>
        <TextArea currentText={commentText} setCurrentText={setCommentText} />
        <button
          onclick={() => {
            if (checkFilled(commentText())) {
              addComment();
            } else {
              setError("Please add a body for the comment");
            }
          }}
          className={styles.addComment}
          style={{ "margin-top": "10px" }}
        >
          Done!
        </button>
        <Show when={error()}>
          <p className={styles.errorText}>{error()}</p>
        </Show>
      </Show>
    </div>
  );
}

export default CommentSection;
