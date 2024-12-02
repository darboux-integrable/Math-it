import styles from "./tag-list-selection.module.css"
import tagsJSON from "../json/tags.json";
import { createSignal, createEffect, Show } from "solid-js";

function TagListSelection(props){

    const allTags = tagsJSON.tags;

  const [currentTag, setCurrentTag] = createSignal("");
  const [filteredTags, setFilteredTags] = createSignal([...allTags]);
    

    createEffect(() => {
        let tags = new Array(...allTags);

        let filtered = tags.filter((tag) => {
            let lowerCaseTag = tag.name.toLowerCase();
            return lowerCaseTag.includes(currentTag().toLowerCase());
        });

        setFilteredTags(filtered);
    })

    return (
      <div className={styles.tagsWrapper}>
        <div className={styles.tagsTopSection}>
          <div className={styles.tagsList}></div>
          <input
            type="text"
            value={currentTag()}
            oninput={(e) => setCurrentTag(e.target.value)}
            className={styles.tagsInput}
          />
        </div>
        <div className={styles.tagsBottomSection}>

            <div className={styles.tagGrid}>
                {filteredTags().map(tag => {
                    return (
                        <div className={styles.tagBlock}>
                            <h3 className={styles.tagTitle}>{tag.name}</h3>
                        </div>
                    )
                })}
            </div>

            {}

        </div>
      </div>
    );

}

export default TagListSelection