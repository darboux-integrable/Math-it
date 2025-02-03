import { createSignal, createEffect, Show } from "solid-js";
import styles from "./add-flash-card-set.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";
import arrow from "../assets/arrow-right-solid.svg";
import { compileText } from "./TextAreaPreview";

export default function AddFlashCardsPage() {
  const [currentSideText, setCurrentSideText] = createSignal("");

  // 0 is for the question side and 1 is for the answer side.
  const [currentSide, setCurrentSide] = createSignal(0);

  const [cardSetTitle, setCardSetTitle] = createSignal("");

  const [flashCards, setFlashCards] = createSignal([
    {
      question: "",
      answer: "",
    },
  ]);

  const [togglePreview, setTogglePreview] = createSignal(false);

  const [currentFlashCardIndex, setCurrentFlashCardIndex] = createSignal(0);

  // Need this version of the current side instead of the getter currentSide
  // this is because the create effect was running prematurely because the getter was changing.
  // Since currentSideNonReactive is not a getter, it does not trigger the create effect when updated.
  let currentSideNonReactive = 0;

  createEffect(() => {
    if (currentSideNonReactive == 0) {
      flashCards()[currentFlashCardIndex()].question = currentSideText();
    } else {
      flashCards()[currentFlashCardIndex()].answer = currentSideText();
    }
  });

  return (
    <div className={styles.page}>
      <SideNavbar />

      <div className={styles.pageContent}>
        <div className={styles.pageTitleWrapper}>
          <h1 className={styles.pageTitle}>Create Flash Card Set</h1>
        </div>

        <div className={styles.flexWrapper}>
          <div className={styles.cardSetTitleWrapper}>
            <h3 className={styles.cardSetTitle}>Title of Collection</h3>
            <input
              value={cardSetTitle()}
              oninput={(e) => setCardSetTitle(e.target.value)}
              type="text"
              className={styles.cardSetTitleInput}
            />
          </div>
        </div>

        <div className={styles.flexWrapper}>
          <div className={styles.currentCardWrapper}>
            <div className={styles.cardTop}>
              <h2 className={styles.sideTitle}>
                {currentSide() == 0 ? "Question" : "Answer"}
              </h2>
              <button
                className={styles.flipButton}
                onclick={() => {
                  // Save the current flashcard side
                  if (currentSide() == 0) {
                    flashCards()[currentFlashCardIndex()].question =
                      currentSideText();
                  } else {
                    flashCards()[currentFlashCardIndex()].answer =
                      currentSideText();
                  }

                  // Chage sides
                  setCurrentSide((currentSide() + 1) % 2);

                  currentSideNonReactive = currentSide();

                  // Load the new sides data
                  if (currentSide() == 0) {
                    setCurrentSideText(
                      flashCards()[currentFlashCardIndex()].question
                    );
                  } else {
                    setCurrentSideText(
                      flashCards()[currentFlashCardIndex()].answer
                    );
                  }
                }}
              >
                Flip
              </button>
            </div>
            <TextArea
              currentText={currentSideText}
              setCurrentText={setCurrentSideText}
            />
          </div>
        </div>
        <div className={styles.flexWrapper}>
          <div className={styles.cardOptionsWrapper}>
            <div className={styles.changeCardButtons}>
              <img src={arrow} className={styles.changeCardButton} alt="" />
              <img src={arrow} className={styles.changeCardButton} alt="" />
            </div>
            <div className={styles.changeCardButtons}>
              <button
                className={styles.newCardButton}
                onclick={() => setTogglePreview(!togglePreview())}
              >
                Generate Preview
              </button>
              <button className={styles.newCardButton}>New Card</button>
            </div>
          </div>
        </div>

        <Show when={togglePreview()}>
          <div className={styles.flexWrapper}>
            <div className={styles.previewWrapper}>
              <h2 className={styles.flashcardPreviewTitle}>
                Preview Flash Cards
              </h2>
              {flashCards().map((flashcard) => (
                <div className={styles.flashcard}>
                  <div className={styles.flashcardContentWrapper}>
                      <div className={styles.questionSide}>
                        <h3 className={styles.sideTitle}>Question</h3>
                        <p className={styles.questionText}>
                          {compileText(flashcard.question)}
                        </p>
                      </div>
                      <div className={styles.answerSide}>
                        <h3 className={styles.sideTitle}>Answer</h3>
                        <p className={styles.answerText}>
                          {compileText(flashcard.answer)}
                        </p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
