import { createSignal, Show } from "solid-js";
import UserComment from "./UserComment";
import styles from "./comment-section.module.css";

function CommentSection({ comments, commmentButtonTheme}) {
  const addComment = () => {};

  const [addCommentSection, setAddCommentSection] = createSignal(false);
  const [addCommentText, setAddCommentText] = createSignal("");

  return (
    <div className={styles.commentsWrapper}>
      {/* A Comment has a vote, text, user, and date */}
      <div className={styles.allComments}>
        {comments.map((comment) => {
          return (
            <UserComment
              votes={comment.upvotes}
              commentBody={comment.body}
              user={comment.user}
              dateAsked={comment.date}
            />
          );
        })}
      </div>
      <button
        className={`${commmentButtonTheme == "notPrimary" ? styles.notPrimaryButton : styles.addComment}`}
        
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

        </Show>
    </div>
  );
}

export default CommentSection;
