import { createSignal, createEffect, Show } from "solid-js";
import styles from "./add-flash-card-set.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";
import arrow from "../assets/arrow-right-solid.svg";
import { compileText } from "./TextAreaPreview";
import TagListSelection from "./TagListSelection";
import checkFilled from "../helpers/checkForFilledInputs";
import { fetchUserFromCookie, getCookieValue } from "../helpers/userInSession";

export default function AddFlashCardsPage() {

  let user;

  fetch("http://127.0.0.1:5000/users/"+getCookieValue("userID"))
  .then(res => res.json())
  .then(data => {
    user = data;
  })

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

  let currentFlashCardIndex = 0;

  const loadCardData = () => {
    if (currentSide() == 0) {
      setCurrentSideText(flashCards()[currentFlashCardIndex].question);
    } else {
      setCurrentSideText(flashCards()[currentFlashCardIndex].answer);
    }
  };

  const [tags, setTags] = createSignal([]);
  let newTags = [];

  // Need this version of the current side instead of the getter currentSide
  // this is because the create effect was running prematurely because the getter was changing.
  // Since currentSideNonReactive is not a getter, it does not trigger the create effect when updated.
  let currentSideNonReactive = 0;

  // Create effect was running when all signals changed not just the wanted signal.
  // And Since there are no dependancy arrays to specify for which signals an update
  // Should be triggered, I had to make copies of certain variables.
  createEffect(() => {
    if (currentSideNonReactive == 0) {
      flashCards()[currentFlashCardIndex].question = currentSideText();
    } else {
      flashCards()[currentFlashCardIndex].answer = currentSideText();
    }
  });

  const createNewCard = () => {
    setFlashCards([
      ...flashCards(),
      {
        question: "",
        answer: "",
      },
    ]);

    currentFlashCardIndex += 1;

    setCurrentSideText("");
    setCurrentSide(0);
    currentSideNonReactive = 0;
  };

  const flipCard = () => {
    // Save the current flashcard side
    loadCardData();

    // Change sides
    setCurrentSide((currentSide() + 1) % 2);

    currentSideNonReactive = currentSide();

    // Load the new sides data
    loadCardData();
  };

  const previousCard = () => {
    if (currentFlashCardIndex - 1 >= 0) {
      currentFlashCardIndex -= 1;
      loadCardData();
    }
  };

  const nextCard = () => {
    if (currentFlashCardIndex + 1 < flashCards().length) {
      currentFlashCardIndex += 1;
      loadCardData();
    }
  };

  const createCardSet = () => {
    if (!checkFilled(cardSetTitle()) || !tags().length > 0) {
      return;
    }

    fetch("http://127.0.0.1:5000/resources/flashcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cardSetTitle(),
        cards: flashCards(),
        tags: tags(),
        created_by: user.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        createNewTags();
        location.replace("/resources");
      });
  };

  const createNewTags = () => {
    if (newTags.length > 0) {
      fetch("http://127.0.0.1:5000/tags/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          names: newTags,
        }),
      })
    }
  };

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
                  flipCard();
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
              <img
                src={arrow}
                className={styles.changeCardButton}
                alt=""
                onclick={() => previousCard()}
              />
              <img
                src={arrow}
                className={styles.changeCardButton}
                alt=""
                onclick={() => nextCard()}
              />
            </div>
            <div className={styles.changeCardButtons}>
              <button
                className={styles.newCardButton}
                onclick={() => setTogglePreview(!togglePreview())}
              >
                Generate Preview
              </button>
              <button
                className={styles.newCardButton}
                onclick={() => {
                  createNewCard();
                }}
              >
                New Card
              </button>
            </div>
          </div>
        </div>

        <Show when={togglePreview()}>
          <div className={styles.flexWrapper}>
            <div className={styles.previewWrapper}>
              <h2 className={styles.flashcardPreviewTitle}>
                Preview Flash Cards
              </h2>
              <div className={styles.flashCardsWrapper}>
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
          </div>
        </Show>
        <div className={styles.flexWrapper}>
          <div className={styles.tagsWrapper}>
            <TagListSelection
              selectedTags={tags}
              setSelectedTags={setTags}
              newTags={newTags}
            />

            <button
              className={`${styles.flipButton} ${styles.doneButton}`}
              onclick={() => {
                createCardSet();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      {() => {
        togglePreview();
        flashCards();
        MathJax.typeset();
      }}
    </div>
  );
}
