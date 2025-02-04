import { createSignal, Show } from "solid-js";
import styles from "./flashcard-set-page.module.css";
import SideNavbar from "./SideNavbar";
import { compileText } from "./TextAreaPreview";
import arrow from "../assets/arrow-right-solid.svg";
import { getCookieValue } from "../helpers/userInSession";
import { useParams } from "@solidjs/router";
import lightStar from "../assets/light-star.svg"
import darkStar from "../assets/dark-star.svg";

export default function FlashcardSetPage() {
  let user;

  const params = useParams();

  const [flashcardSet, setFlashcardSet] = createSignal(false);

  const [currentCardIndex, setCurrentCardIndex] = createSignal(0);

  const [starIcon, setStarIcon] = createSignal(darkStar);

  // 0 is for the question and 1 is for the answer
  const [currentSide, setCurrentSide] = createSignal(0);

  const loadCardData = () => {
    if (currentSide() == 0) {
      return flashcardSet().cards[currentCardIndex()].question;
    } else if (currentSide() == 1) {
      return flashcardSet().cards[currentCardIndex()].answer;
    }

    return "";
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

    setStarIcon(user.favorite_resources.includes(flashcardSet()._id) ? lightStar : darkStar)
  };

  loadPageData();

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <Show when={flashcardSet()}>
          <div className={styles.pageNav}>
            <h1 className={styles.pageTitle}>{flashcardSet().title}</h1>
            <button className={styles.greenButton}>Back</button>
          </div>
          <div className={styles.flashcardWrapper}>
            <div className={styles.flashcard}>
              <h2 className={styles.flashcardSideTitle}>
                {currentSide() == 0 ? "Question" : "Answer"}
              </h2>
              <div className={styles.cardBody}>
                <h2 className={styles.cardText}>{compileText(loadCardData())}</h2>
              </div>
            </div>
            <div className={styles.cardControlsWrapper}>
              <div className={styles.indexButtonsWrapper}>
                  <img src={arrow} alt="" className={styles.cardControlButton} />
                  <img src={arrow} alt="" className={styles.cardControlButton} />
              </div>
              <div className={styles.favoriteSection}>
                <img src={starIcon()} alt="" className={styles.favoriteIcon} />
              </div>
            </div>
          </div>
        </Show>
      </div>
      {() => {
        currentSide();
        flashcardSet();
        MathJax.typeset();
      }}
    </div>
  );
}
