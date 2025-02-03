import styles from "./resources-page.module.css"
import SideNavbar from "./SideNavbar";
import { createSignal, Show } from "solid-js";
import TagListSelection from "./TagListSelection";

import FlashCard from "./FlashCard";

function ResourcesPage(){

    const [yourResources, setYourResources] = createSignal([]);
    const [favorites, setFavorites] = createSignal([]);

    const [tags, setTags] = createSignal([]);
    let newTags = [];

    return (
      <div className={styles.page}>
        <SideNavbar />
        <div className={styles.pageContent}>
          <h1 className={styles.pageTitle}>Resources</h1>
          <div className={styles.topContent}>
            <div className={styles.searchWrapper}>
              <TagListSelection
                newTags={newTags}
                selectedTags={tags}
                setSelectedTags={setTags}
              />
              <button className={styles.goButton}>Go!</button>
            </div>
            <div className={styles.addFlashCardWrapper}>
              <button className={styles.goButton}>Explore</button>
              <button className={styles.goButton} onclick={() => location.replace("/resources/add")}>Add FlashCard</button>
            </div>
          </div>
          <div className={styles.favoritesWrapper}>
            <h2 className={styles.favoritesTitle}>Favorites</h2>
            <div className={styles.favoriteFlashCards}>
              <FlashCard title={"Calculus 1 Cards"} />
              <FlashCard title={"Calculus 2 Cards"} />
              <FlashCard title={"Calculus 3 Cards"} />
            </div>
          </div>

          <div className={styles.yourCardsWrapper}>
            <h2 className={styles.yourCardsTitle}>Your Cards</h2>
            <div className={styles.yourFlashCards}>
              <FlashCard title={"Calculus 1 Cards"} />
              <FlashCard title={"Calculus 2 Cards"} />
              <FlashCard title={"Calculus 3 Cards"} />
            </div>
          </div>
        </div>
      </div>
    );

}

export default ResourcesPage;