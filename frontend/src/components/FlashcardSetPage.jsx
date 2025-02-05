import { createSignal, onMount, Show } from "solid-js";
import styles from "./flashcard-set-page.module.css";
import SideNavbar from "./SideNavbar";
import { compileText } from "./TextAreaPreview";
import arrow from "../assets/arrow-right-solid.svg";
import { getCookieValue } from "../helpers/userInSession";
import { useParams } from "@solidjs/router";
import lightStar from "../assets/light-star.svg";
import darkStar from "../assets/dark-star.svg";

export default function FlashcardSetPage() {
  let user;

  const params = useParams();

  const [flashcardSet, setFlashcardSet] = createSignal(false);

  const [currentCardIndex, setCurrentCardIndex] = createSignal(0);

  const [starIcon, setStarIcon] = createSignal(darkStar);

  // 0 is for the question and 1 is for the answer
  const [currentSide, setCurrentSide] = createSignal(0);
  let text;

  const loadCardData = () => {
    text.innerText = "";

    if (currentSide() == 0) {
      text.innerText = flashcardSet().cards[currentCardIndex()].question;
    } else if (currentSide() == 1) {
      text.innerText = flashcardSet().cards[currentCardIndex()].answer;
    }

    MathJax.typeset();

    return text.innerText;
  };

  const loadPageData = async () => {
    const userResponse = await fetch(
      `http://127.0.0.1:5000/users/${getCookieValue("userID")}`
    );
    user = await userResponse.json();

    const flashcardSetResponse = await fetch(
      `http://127.0.0.1:5000/resources/flashcard/${params.id}`
    );

    setFlashcardSet(await flashcardSetResponse.json());

    setStarIcon(
      user.favorite_resources.includes(flashcardSet()._id)
        ? lightStar
        : darkStar
    );
  };

  const previousCard = () => {
    if (currentCardIndex() - 1 >= 0) {
      setCurrentCardIndex(currentCardIndex() - 1);
      loadCardData();
    }
  };

  const nextCard = () => {
    if (currentCardIndex() + 1 < flashcardSet().cards.length) {
      setCurrentCardIndex(currentCardIndex() + 1);
      loadCardData();
    }
  };

  const flipSide = () => {
    setCurrentSide((currentSide() + 1) % 2);
    loadCardData();
  };


  const saveToFavorites = async () => {
    console.log(user.favorite_resources);

    const updateResponse = await fetch(
      `http://127.0.0.1:5000/users/${user._id}/favorite_resources`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: user.favorite_resources,
        }),
      }
    );

    const details = await updateResponse.json();
  };


  loadPageData();

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <Show when={flashcardSet()}>
          <div className={styles.pageNav}>
            <h1 className={styles.pageTitle}>{flashcardSet().title}</h1>
            <button
              className={styles.greenButton}
              onclick={() => location.replace("/resources")}
            >
              Back
            </button>
          </div>
          <div className={styles.flashcardWrapper}>
            <div
              className={styles.flashcard}
              onclick={() => {
                flipSide();
              }}
            >
              <div className={styles.cardTop}>
                <h2 className={styles.flashcardSideTitle}>
                  {currentSide() == 0 ? "Question" : "Answer"}
                </h2>
                <h2 className={styles.flashcardSideTitle}>
                  {currentCardIndex() + 1}/{flashcardSet().cards.length}
                </h2>
              </div>
              <div className={styles.cardBody}>
                <h2 ref={text} className={styles.cardText}>{loadCardData()}</h2>
              </div>
            </div>
            <div className={styles.cardControlsWrapper}>
              <div className={styles.indexButtonsWrapper}>
                <img
                  src={arrow}
                  alt=""
                  onclick={() => {
                    previousCard();
                  }}
                  className={styles.cardControlButton}
                />
                <img
                  src={arrow}
                  alt=""
                  onclick={() => {
                    nextCard();
                  }}
                  className={styles.cardControlButton}
                />
              </div>
              <div className={styles.favoriteSection}>
                <h2 className={styles.createdByText}>
                  Created by{" "}
                  <span className={styles.username}>
                    {flashcardSet().created_by}
                  </span>
                </h2>
                <img
                  src={starIcon()}
                  alt="Favorite Icon"
                  onclick={() => {
                    if (starIcon() == lightStar) {
                      setStarIcon(darkStar);
                      user.favorite_resources.splice(
                        user.favorite_resources.indexOf(flashcardSet()._id),
                        1
                      );
                    } else {
                      setStarIcon(lightStar);
                      user.favorite_resources.push(flashcardSet()._id);
                    }
                    saveToFavorites();
                  }}
                  className={styles.favoriteIcon}
                />
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
