import styles from "./feature.module.css";

function Feature({ title, icon, text }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureHead}>
        <h1 className={styles.featureTitle}>{title}</h1>
        <img src={icon} alt="Icon" className={styles.featureIcon} />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.featureText}>{text}</p>
      </div>
    </div>
  );
}

export default Feature;
