import { createSignal } from "solid-js";
import styles from "./resource-list-page.module.css";
import SideNavbar from "./SideNavbar";
import { useSearchParams } from "@solidjs/router";
import FlashCard from "./FlashCard";

export default function ResourceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [flashcards, setFlashCards] = createSignal([]);

  const filterCards = () => {
    fetch(
      `http://127.0.0.1:5000/resources/flashcard/filter_by_tag/${searchParams.tag}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlashCards(data);
      });
  };

  const [filterTag, setFilterTag] = createSignal(searchParams.tag);

  filterCards();

  return (
    <div className={styles.page}>
      <SideNavbar></SideNavbar>
      <div className={styles.pageContent}>
        <h1 className={styles.pageTitle}>
          Resources: {searchParams.tag || "No Filter"}
        </h1>
        <div className={styles.navWrapper}>
          <div className={styles.searchWrapper}>
            <input
              value={filterTag()}
              oninput={(e) => setFilterTag(e.target.value)}
              placeholder="Enter Tag to Search"
              onkeypress={(e) => {
                if (e.key == "Enter") {
                  location.replace(
                    "/resources/filter_by_tag/?tag=" +
                      encodeURIComponent(filterTag())
                  );
                }
              }}
              type="text"
              className={styles.searchInput}
            />
            <button
              className={styles.greenButton}
              onclick={() => {
                location.replace(
                  "/resources/filter_by_tag/?tag=" +
                    encodeURIComponent(filterTag())
                );
              }}
            >
              Search
            </button>
          </div>

          <button className={styles.greenButton} onclick={() => {
            location.replace("/resources/")
          }}>Back</button>
        </div>
        <div className={styles.flashcards}>
          {flashcards().map((card) => {
            return <FlashCard title={card.title} id={card._id} />;
          })}
        </div>
      </div>
    </div>
  );
}
