import styles from "./ask-question-page.module.css";
import SideNavbar from "./SideNavbar";
import TextArea from "./TextArea";

function AskQuestionPage(){
    return (
        <div className={styles.wrapper}>
            <SideNavbar />
            <div className={styles.pageContent}>

                <TextArea />

            </div>
        </div>
    )
}

export default AskQuestionPage;