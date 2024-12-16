import styles from "./quote.module.css";

function Quote({ quoteText, author }) {
  return (
    <div className={styles.quote}>
      <h1 className={styles.quoteBack}>"</h1>
      <p className={styles.quoteText}>{quoteText}</p>
      <p className={styles.author}>{author}</p>
    </div>
  );
}

export default Quote;
