import styles from "./tag.module.css";

function Tag({tagName}){

    return (
        <div className={styles.tagWrapper}>
            <p className={styles.tagText}>{tagName}</p>
        </div>
    )

}

export default Tag;