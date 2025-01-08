import styles from "./educator-discussion-page.module.css";
import Navbar from "./Navbar";
import { useParams } from "@solidjs/router";
import { compileText } from "./TextAreaPreview";
import { formateDate } from "../helpers/dateFormatter";

function EducatorDiscussionPage() {
  const params = useParams();

  const classroomId = params.id;

  // Dummy Data
  const discussions = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      title: "Lorem Ipsum",
      numberOfPost: 19,
      dueDate: "2025-1-7",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      title: "Lorem Ipsum",
      numberOfPost: 19,
      dueDate: "2025-1-7",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      title: "Lorem Ipsum",
      numberOfPost: 19,
      dueDate: "2025-1-7",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      title: "Lorem Ipsum",
      numberOfPost: 19,
      dueDate: "2025-1-7",
    },
  ];

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

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <p className={styles.tableHeadTitle}>Topic</p>
            <p className={styles.tableHeadTitle}>Posts</p>
            <p className={styles.tableHeadTitle}>Due Date</p>
          </div>

          <div className={styles.tableBody}>
            {discussions.map(discussion => {
              return (
                <div className={styles.tableRow}>
                  <div className={`${styles.dicussionDescription} ${styles.tableData}`}>
                    <h2 className={styles.discussionTitle}>{discussion.title}</h2>
                    <p className={styles.discussionDescription}>{compileText(discussion.text)}</p>
                  </div>

                  <div className={styles.tableData}>
                    <p className={styles.postsText}>{discussion.numberOfPost}</p>
                  </div>
                  <div className={styles.tableData}>
                    <p className={styles.dueDateText}>{formateDate(discussion.dueDate)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className={styles.addDiscussionButton}>Create Discussion</button>
      </div>
    </>
  );
}

export default EducatorDiscussionPage;
