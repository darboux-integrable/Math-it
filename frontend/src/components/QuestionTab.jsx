import styles from './question-tab.module.css';

import Tag from "./Tag";
function QuestionTab({questionId, title, votes, answers, views, startText, tags, username, delay}) {
    const maxLength = 100;

    return (
        <div className={styles.questionTab} style={{"animation-delay": `${delay}ms`}} onclick={() => location.replace(`/questions/${questionId}`)}>
            <div className={styles.leftContent}>
                <p className={styles.leftText}>{votes || 0} Votes</p>
                <p className={styles.leftText} class={answers > 0 ? styles.answeredQuestion : " "} >{answers || 0} Answers</p>
                <p className={styles.leftText}>{views || 0} views</p>
            </div>
            <div className={styles.rightContent}>
                <div class={styles.topContent}>
                    <h1 className={styles.questionTitle}>{title}</h1>
                    <p className={styles.questionText}>{startText.length > maxLength ? startText.substring(0,maxLength - 3) + "..." : startText}</p>
                </div>
                <div class={styles.bottomContent}>
                    <div class={styles.tags}>
                        {tags.map(tag => {
                            return (<Tag tagName={tag}/>)
                        })}
                    </div>
                    <div class={styles.userSection}>
                        <p class={styles.userText}>Asked By {username}</p>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default QuestionTab;