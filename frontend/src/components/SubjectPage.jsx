import styles from "./subject-page.module.css"
import SideNavbar from "./SideNavbar";
import subjectsJSON from "../json/subjects.json";
import { createSignal, Show } from "solid-js";
const subjects = subjectsJSON.subjects;

function SubjectPage({params}) {
    let subject = params.subject.replace("_", " ");

    let subjectTitle = subject[0].toUpperCase() + subject.substring(1);

    // Math Subjects Topic
    const getTopics = (targetSubject) => {
        for(let i = 0; i < subjectsJSON.subjects.length; i++)
            if(subjects[i].subject.toLowerCase() == targetSubject)
                return subjects[i].topics;
    }

    const topics = getTopics(subject);

    const [topicTitle, setTopicTitle] = createSignal("");
    const [topicDescription, setTopicDescription] = createSignal("");

    return (
        <div className={styles.wrapper}>
            <SideNavbar />
            <div className={styles.pageContent}>

                <Show when={topics}>
                    
                    <div className={styles.subjectContainer}>
                        
                        <div className={styles.leftContent}>
                            <h1 className={styles.subjectTitle}>{subjectTitle}</h1>
                            <div className={styles.topicsContainer}>
                                {topics.map(topic => {
                                    <button className={styles.topicButton}>{topic}</button>
                                })}
                            </div>

                        </div>

                        <div className={styles.rightContent}>

                                <h2 className={styles.titleTopic}>{topicTitle()}</h2>
                                <p className={styles.topicDescription}>{topicDescription()}</p>
                        </div>

                    </div>

                </Show>

                <Show when={!topics}>
                    <div className={styles.noTopicsFoundWrapper}>
                        <h1 className={styles.noTopicsTitle}>Sorry, No Topics Where Found</h1>
                    </div>
                </Show>

            </div>

        </div>
    )

}
export default SubjectPage;