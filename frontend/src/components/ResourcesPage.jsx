import styles from "./resources-page.module.css";
import SideNavbar from "./SideNavbar";
import { createSignal, Show } from "solid-js";
import TagListSelection from "./TagListSelection";

import FlashCard from "./FlashCard";
import { getCookieValue } from "../helpers/userInSession";

function ResourcesPage() {
  let user;

  const [yourResources, setYourResources] = createSignal([]);
  const [favorites, setFavorites] = createSignal([]);

  const [filterTag, setFilterTag] = createSignal("");

  const loadPageData = async () => {
    const userFetch = await fetch(
      `http://127.0.0.1:5000/users/${getCookieValue("userID")}`
    );

    user = await userFetch.json();

    const yourResourcesFetch = await fetch(
      `http://127.0.0.1:5000/resources/created_by/${encodeURIComponent(
        user.username
      )}`
    );

    setYourResources(await yourResourcesFetch.json());

    const favoritesFetch = await fetch(
      "http://127.0.0.1:5000/resources/flashcard/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: user.favorite_resources,
        }),
      }
    );
    setFavorites(await favoritesFetch.json());
  };
  loadPageData();
  return (
    <div className={styles.page}>
      <SideNavbar />
      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>Resources</h1>
        <div className={styles.topContent}>
          <div className={styles.searchWrapper}>
            <input
              value={filterTag()}
              oninput={(e) => setFilterTag(e.target.value)}
              onkeypress={(e) => {
                if (e.key == "Enter") {
                  location.replace(
                    "/resources/filter_by_tag?tag=" +
                      encodeURIComponent(filterTag())
                  );
                }
              }}
              type="text"
              placeholder="Enter Tag to Search By"
              className={styles.tagsInput}
            />
            <button
              className={styles.goButton}
              onclick={() => {
                location.replace(
                  "/resources/filter_by_tag?tag=" +
                    encodeURIComponent(filterTag())
                );
              }}
            >
              Go!
            </button>
          </div>
          <div className={styles.addFlashCardWrapper}>
            {/* Maybe Make this a feature later after the project deadline so it is not rushed */}
            {/* <button className={styles.goButton}>Explore</button> */}
            <button
              className={styles.goButton}
              onclick={() => location.replace("/resources/add")}
            >
              Add Flashcard
            </button>
          </div>
        </div>
        <div className={styles.favoritesWrapper}>
          <h2 className={styles.favoritesTitle}>Favorites</h2>
          <div className={styles.favoriteFlashCards}>
            {favorites().length > 0 ? (
              favorites().map((flashcard) => {
                return <FlashCard title={flashcard.title} id={flashcard._id} />;
              })
            ) : (
              <p className={styles.noCards}>No Favorited Flashcards</p>
            )}
          </div>
        </div>

        <div className={styles.yourCardsWrapper}>
          <h2 className={styles.yourCardsTitle}>Your Cards</h2>
          <div className={styles.yourFlashCards}>
            {yourResources().length > 0 ? (
              yourResources().map((flashcard) => {
                return <FlashCard title={flashcard.title} id={flashcard._id}/>;
              })
            ) : (
              <p className={styles.noCards}>
                You Have Not Created Any Resources
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
