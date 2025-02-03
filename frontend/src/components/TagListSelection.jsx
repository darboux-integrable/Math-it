import styles from "./tag-list-selection.module.css";
import { createSignal, Show } from "solid-js";

function TagListSelection({ selectedTags, setSelectedTags, newTags }) {
  let tags;

  const [currentTag, setCurrentTag] = createSignal("");
  const [filteredTags, setFilteredTags] = createSignal([]);

  const [error, setError] = createSignal("");

  fetch(`http://127.0.0.1:5000/tags/all_tags`)
    .then((res) => res.json())
    .then((allTags) => {
      tags = allTags;
    });

  const filterTags = () => {
    setFilteredTags(
      tags
        .filter(
          (tag) =>
            tag.name.includes(currentTag()) &&
            !selectedTags().includes(tag.name)
        )
        .map((tag) => tag.name)
    );
  };

  const addTag = (tag) => {
    if (selectedTags().length + 1 <= 5) {
      setSelectedTags([...selectedTags(), tag]);
      setCurrentTag("");
      setFilteredTags([]);
      setError("");
    } else {
      setError(`Adding this tag would make the total more than 5. `);
    }
  };

  const addAllFilteredTags = () => {
    if (
      filteredTags().length > 0 &&
      selectedTags().length + filteredTags().length <= 5
    ) {
      setSelectedTags([...selectedTags(), ...filteredTags()]);
      setError("");
    } else if (selectedTags().length + 1 <= 5) {
      setSelectedTags([...selectedTags(), currentTag()]);
      newTags.push(currentTag());
      setError("");
    } else {
      setError(
        `Adding these ${
          filteredTags().length
        } tag(s) would make the total more than 5.`
      );
    }
  };

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tagsTopSection}>
        <div className={styles.tagsList}></div>
        <input
          type="text"
          value={currentTag()}
          placeholder="Enter Tags Names"
          onkeyup={(e) => {
            if (e.key == "Enter") {
              addAllFilteredTags();
              setCurrentTag("");
            }

            setCurrentTag(e.target.value);
            if (currentTag().length != 0) {
              filterTags();
            } else {
              setFilteredTags([]);
            }
          }}
          className={styles.tagsInput}
        />
        <div className={styles.tagsBottomSection}>
          <div className={styles.tagGrid}>
            {filteredTags().map((tag) => (
              <div
                className={styles.tagWrapper}
                style={{
                  "animation-delay":
                    filteredTags().indexOf(tag) * 100 + 150 + "ms",
                }}
              >
                <div className={styles.tag} onclick={() => addTag(tag)}>
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Show when={error()}>
        <p className={styles.errorText}>{error()}</p>
      </Show>
      <Show when={selectedTags().length > 0}>
        <div className={styles.selectedTagsWrapper}>
          <div className={styles.selectedTags}>
            {selectedTags().map((tag) => (
              <div
                className={styles.tagWrapper}
                style={{
                  "animation-delay": selectedTags().indexOf(tag) * 100 + "ms",
                }}
              >
                <div className={styles.tag}>{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </Show>
    </div>
  );
}

export default TagListSelection;
