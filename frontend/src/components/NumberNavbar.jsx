import styles from "./number-navbar.module.css";

function NumberNavbar({
  smallestIndex,
  setSmallestIndex,
  largestIndex,
  setLargestIndex,
  setCurrentIndex,
  maxLength
}) {
  return (
    <div className={styles.navbar}>
      <Show when={smallestIndex() != 0}>
        <div
          className={`${styles.navButton} ${styles.backButton}`}
          onclick={() => {
            setLargestIndex(largestIndex() - 1);
            setSmallestIndex(smallestIndex() - 1);
          }}
        >
          Back
        </div>
      </Show>
      {() => {
        let navButtons = [];
        for (let i = smallestIndex(); i < largestIndex(); i++) {
          navButtons.push(
            <div
              className={styles.navButton}
              onclick={(e) => {
                const index = parseInt(e.target.innerText) - 1;
                setCurrentIndex(index);
              }}
            >
              {i + 1}
            </div>
          );
        }
        return navButtons;
      }}
      <Show when={largestIndex() != maxLength}>
        <div
          className={`${styles.navButton} ${styles.forwardButton}`}
          onclick={() => {
            setLargestIndex(largestIndex() + 1);
            setSmallestIndex(smallestIndex() + 1);
          }}
        >
          Forward
        </div>
      </Show>
    </div>
  );
}

export default NumberNavbar;