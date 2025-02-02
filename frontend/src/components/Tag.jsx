import styles from "./tag.module.css";

function Tag({tagName}){

    return (
        <div className={styles.tagWrapper} onclick={() => {location.replace("/questions/tags/"+encodeURIComponent(tagName.toLowerCase()))}}>
            <p className={styles.tagText}>{tagName}</p>
        </div>
    )

}

export default Tag;