import styles from "./question-page.module.css";
import SideNavbar from "./SideNavbar";
import Question from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import downArrowIcon from "../assets/line-arrow.svg";
import { createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import TextArea from "./TextArea";
import { getCookieValue } from "../helpers/userInSession";
import { formateDate } from "../helpers/dateFormatter";

function QuestionPage() {
  const params = useParams();

  const id = params.id;

  const [question, setQuestion] = createSignal(false);

  const [answerText, setAnswerText] = createSignal("");

  const [answers, setAnswers] = createSignal([]);

  const [comments, setComments] = createSignal(false);

  const [toggleAnswer, setToggleAnswer] = createSignal(false);

  let user;

  fetch(`http://127.0.0.1:5000/users/${getCookieValue("userID")}`)
  .then(res => res.json())
  .then(userData => {user = userData});

  const createAnswer = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    fetch(`http://127.0.0.1:5000/answers`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: answerText(),
        user: user.username,
        questionId: id,
        user_type: user.account_type,
        answer_date: formateDate(`${year}-${month}-${day}`)
      })
    })
    .then(res => res.json())
    .then(data => {
      location.reload();
    })

  }

  // Get the question
  const getPageData = async () => {
    const questionResponse = await fetch(
      `http://127.0.0.1:5000/questions/${id}`
    );

    const questionData = await questionResponse.json();

    setQuestion(questionData);

    const commentsResponse = await fetch(
      `http://127.0.0.1:5000/user_comments/all_comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: question().comments }),
      }
    );

    const commentsData = await commentsResponse.json();

    setComments(commentsData);
  };

  getPageData();

  // Get the answers to the question
  fetch(`http://127.0.0.1:5000/answers/question/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setAnswers(data);
    });

  const [filter, setFilter] = createSignal("Highest Score (Default)");

  return (
    <div className={styles.wrapper}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <Show when={question() && comments()}>
          <div className={styles.questionWrapper}>
            <Question
              title={question().title}
              views={question().views}
              userAsking={question().user_asking}
              upvotes={question().votes}
              askedDate={question().ask_date}
              comments={comments()}
              questionBody={question().text}
              tags={question().tags}
              questionId={id}
            />
          </div>
        </Show>
        {() => {
          question();
          comments();
          MathJax.typeset();
        }}
        <div className={styles.answersWrapper}>
          <div className={styles.answersHeader}>
            <h1 className={styles.answersTitle}>
              {answers().length} Answer
              {answers().length > 1 ? "s" : ""}
            </h1>
            <div className={styles.dropDownContainer}>
              <div className={styles.currentOption}>
                <p className={styles.currentOptionText}>{filter()}</p>
                <img
                  src={downArrowIcon}
                  alt="down arrow for selection"
                  className={styles.selectionArrow}
                />
              </div>
              <div className={styles.options}>
                <div className={styles.option}>
                  <div
                    className={styles.colorBox}
                    style={{ "background-color": "var(--green-1)" }}
                  ></div>
                  <p className={styles.optionText}>Highest Score (Default)</p>
                </div>
                <div className={styles.option}>
                  <div
                    className={styles.colorBox}
                    style={{ "background-color": "var(--green-2)" }}
                  ></div>
                  <p className={styles.optionText}>Newest First</p>
                </div>
                <div className={styles.option}>
                  <div
                    className={styles.colorBox}
                    style={{ "background-color": "var(--light-green-1)" }}
                  ></div>
                  <p className={styles.optionText}>Oldest First</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.answersList}>
            {answers().map((answer) => {
              return (
                <QuestionAnswer
                  upvotes={answer.votes}
                  comments={answer.comments}
                  answerBody={answer.text}
                  user={answer.user}
                  userType={answer.user_type}
                />
              );
            })}
          </div>

          <button
            className={styles.addAnswerButton}
            onclick={() => setToggleAnswer(!toggleAnswer())}
          >
            Answer Question
          </button>

          <Show when={toggleAnswer()}>
            <h1 className={styles.createAnswerTitle}>Create Answer</h1>
            <TextArea currentText={answerText} setCurrentText={setAnswerText} />

            <button onclick={() => {createAnswer();}} className={styles.addAnswerButton} style={{"margin-top": "10px", "font-size": "1.5rem"}}>Done!</button>

          </Show>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
