import styles from "./question.module.css";
import Vote from "./Vote";
import Tag from "./Tag";
import CommentSection from "./CommentSection";
function Question({title, askedDate, views, upvotes, comments, questionBody, tags}){

    return (

        <div className={styles.questionWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.titleSectionBottom}>
                        <p className={styles.questionHeaderData}>Asked {askedDate}</p>
                        <p className={styles.questionHeaderData}>Viewed {views} times</p>
                    </div>
                </div>
                <button className={styles.askButton} onclick={() => {location.replace("/questions/ask")}} >Ask a Question</button>
            </div>
            <div className={styles.questionBody}>
                <Vote numberOfVotes={upvotes} />
                <div className={styles.questionTextWrapper}>
                    {questionBody}
                </div>
            </div>
            <div className={styles.commentSectionWrapper}>
                <CommentSection comments={comments}/>
            </div>
            <div className={styles.tagsWrapper}>
                {tags.map(tag => {
                    return <Tag tagName={tag} />
                })}
            </div>
        </div>

    )

}

export default Question;