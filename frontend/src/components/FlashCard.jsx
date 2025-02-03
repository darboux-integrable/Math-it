import styles from "./flash-card.module.css"

export default function FlashCard({title}){
    return (
      <div className={styles.flashCard}>
        <div className={`${styles.card1} ${styles.card}`}></div>
        <div className={`${styles.card2} ${styles.card}`}></div>
        <div className={`${styles.card3} ${styles.card}`}>
            <h1 className={styles.flashCardTitle}>{title}</h1>
        </div>
      </div>
    );
}