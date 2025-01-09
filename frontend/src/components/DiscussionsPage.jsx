import styles from "./discussions-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import { compileText } from "./TextAreaPreview";
import { formateDate, formateTime } from "../helpers/dateFormatter";
import { createSignal, Show } from "solid-js";

function DiscussionPage({accountType}) {
  const params = useParams();

  const classroomId = params.id;

  const [discussions, setDiscussions] = createSignal(false);

  fetch(`http://127.0.0.1:5000/discussions/get_all?classroom_id=${classroomId}`)
    .then((res) => res.json())
    .then((data) => {
      setDiscussions(data.discussions);
    });

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
        <h1 className={styles.pageTitle}>Discussions</h1>

        <Show when={discussions() && discussions().length > 0}>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <p className={styles.tableHeadTitle}>Topic</p>
              <p className={styles.tableHeadTitle}>Posts</p>
              <p className={styles.tableHeadTitle}>Due Date</p>
            </div>
            <div className={styles.tableBody}>
              {discussions().map((discussion) => {
                return (
                  <div
                    className={`${styles.tableRow}`}
                    onclick={() => {
                      location.replace(
                        `/classrooms/${classroomId}/educator/discussions/${discussion._id}`
                      );
                    }}
                  >
                    <div
                      className={`${styles.dicussionDescription} ${
                        styles.tableData
                      }  ${
                        discussions().indexOf(discussion) % 2 == 0
                          ? styles.evenRow
                          : ""
                      }`}
                    >
                      <h2 className={styles.discussionTitle}>
                        {discussion.title}
                      </h2>
                      <p className={styles.discussionDescription}>
                        {compileText(discussion.text)}
                      </p>
                    </div>
                    <div className={styles.tableData}>
                      <p className={styles.postsText}>
                        {discussion.posts.length}
                      </p>
                    </div>
                    <div className={styles.tableData}>
                      <p className={styles.dueDateText}>
                        {formateDate(discussion.due_date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Show>

        <Show when={!discussions() || discussions().length == 0}>
          <p className={styles.noDiscussionsText}>
            There are currently no discussions
          </p>
        </Show>
        <Show when={accountType == "educator"}>
          <button
            className={styles.addDiscussionButton}
            onclick={() => {
              location.replace(
                `/classrooms/${classroomId}/educator/discussions/create`
              );
            }}
          >
            Create Discussion
          </button>
        </Show>
        {/* Every time there is a change to the array of discussions */}
        {/* we need to re-typeset the page.  */}
        {() => {
          discussions();
          MathJax.typeset();
        }}
      </div>
    </>
  );
}

export default DiscussionPage;
