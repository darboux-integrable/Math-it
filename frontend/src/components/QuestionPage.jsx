import styles from "./question-page.module.css";
import SideNavbar from "./SideNavbar";
import Question from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import downArrowIcon from "../assets/line-arrow.svg";
import { createSignal } from "solid-js";

function QuestionPage({ id }) {
  const question = {
    title: "This is the title of my question",
    body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Velit pretium nullam platea rhoncus maecenas mauris felis id. Iaculis fringilla phasellus natoque sodales praesent fermentum tristique vivamus. Etiam eleifend cursus volutpat senectus luctus libero bibendum. Maecenas praesent velit dignissim bibendum fusce. Litora tempor magnis varius pulvinar luctus. Senectus gravida dictum tincidunt ridiculus quis. Amet ac mauris pellentesque feugiat luctus ex! Orci malesuada erat; tempor nec maximus morbi.Nam arcu tincidunt sit lobortis facilisis leo. Lectus vestibulum class tristique amet tempus. Donec iaculis sagittis primis suscipit dignissim conubia vivamus. Pharetra faucibus porttitor taciti penatibus condimentum leo aliquam phasellus. In vulputate vel sagittis leo nisi turpis fames netus. Urna at facilisis, phasellus porta luctus magnis semper. Eros commodo aliquam lectus; scelerisque velit nulla. Feugiat ipsum nunc aenean leo dolor leo. Metus efficitur molestie sociosqu convallis nisi pulvinar et cursus. Cubilia nam dis, consectetur ipsum sollicitudin rhoncus vitae. Volutpat nullam amet orci netus habitant neque aliquet dictum. Placerat natoque cubilia lorem pharetra gravida, scelerisque neque.",
    date: "April 23, 2018",
    views: 1000,
    upvotes: 89,
    tags: ["Trigonometry", "Algebra", "Calculus 1", "Differential Calculus"],
    answers: [
      {
        body: "This is the answer to the question",
        comments: [
          {
            body: "This is a comment on the answer to the question",
            user: "DarbouxIntegrable",
            upvotes: 121,
            date: "May 21, 2019",
          },
        ],
        upvotes: 10,
      },
      {
        body: "This is the answer to the question",
        comments: [
          {
            body: "This is a comment on the answer to the question",
            user: "DarbouxIntegrable",
            upvotes: 121,
            date: "May 21, 2019",
          },
        ],
        upvotes: 10,
      },
    ],
    comments: [
      {
        body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Hac nibh arcu natoque; natoque adipiscing nibh inceptos. Aerat vestibulum vivamus vestibulum malesuada ultricies eget. Ultrices ligula eu lacus cras aenean; rhoncus cursus mauris.",
        upvotes: 54,
        user: "RiemannIntegrable",
        date: "April 24, 2019",
      },
      {
        body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Interdum lacinia rutrum et dui, cursus erat semper. Venenatis porta ipsum nisl magna lectus lorem egestas at.",
        upvotes: 54,
        user: "RiemannIntegrable",
        date: "April 24, 2019",
      },
      {
        body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Vel metus magnis conubia rhoncus suscipit, vel risus netus. Mauris metus ante non cras dictum vel malesuada porta. Pulvinar pellentesque ultrices class torquent maecenas iaculis mattis.",
        upvotes: 54,
        user: "RiemannIntegrable",
        date: "April 24, 2019",
      },
      {
        body: "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit consequat nisi volutpat vehicula maximus vel.",
        upvotes: 54,
        user: "RiemannIntegrable",
        date: "April 24, 2019",
      },
    ],
  };

  const [filter, setFilter] = createSignal("Highest Score (Default)");

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <div className={styles.questionWrapper}>
          <Question
            title={question.title}
            views={question.views}
            upvotes={question.upvotes}
            askedDate={question.date}
            comments={question.comments}
            questionBody={question.body}
            tags={question.tags}
          />
        </div>

        <div className={styles.answersWrapper}>

          <div className={styles.answersHeader}>
            <h1 className={styles.answersTitle}>{question.answers.length} Answer{question.answers.length > 1 ? "s" : ""}</h1>
            <div className={styles.dropDownContainer}>
              <div className={styles.currentOption}>
                <p className={styles.currentOptionText}>{filter()}</p>
                <img src={downArrowIcon} alt="down arrow for selection" className={styles.selectionArrow}/>
              </div>
              <div className={styles.options}>
                <div className={styles.option}>
                  <div className={styles.colorBox} style={{"background-color": "var(--green-1)"}}></div>
                  <p className={styles.optionText}>Highest Score (Default)</p>
                </div>
                <div className={styles.option}>
                  <div className={styles.colorBox} style={{"background-color": "var(--green-2)"}}></div>
                  <p className={styles.optionText}>Newest First</p>
                </div>
                <div className={styles.option}>
                  <div className={styles.colorBox} style={{"background-color": "var(--light-green-1)"}}></div>
                  <p className={styles.optionText}>Oldest First</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.answersList}>
            {question.answers.map((answer) => {
              return (
                <QuestionAnswer
                  upvotes={answer.upvotes}
                  comments={answer.comments}
                  answerBody={answer.body}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
