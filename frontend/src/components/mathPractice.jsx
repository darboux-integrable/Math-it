import styles from "./math-practice.module.css";
import SideNavbar from "./SideNavbar";
import basic4Icon from "../assets/basic4.svg";
import postIcon from "../assets/post.svg";
import puzzleIcon from "../assets/puzzle.svg";
import classroomIcon from "../assets/classroom.svg";
import gearIcon from "../assets/gear.svg";

function MathPractice(){
    let buttons = [
        {
          title: "Math Practice",
          icon: basic4Icon,
          text: "Hone your skills in many difference math subjects like algebra. The subjects are broken down by topic.",
        },
        {
          title: "Math Discussion Forms",
          icon: postIcon,
          text: "Here you can post your questions and others can answer them. Answers from educators and tutors will show first to make sure you get the highest quality answer.",
        },
        {
          title: "Resources",
          icon: puzzleIcon,
          text: "Here you can find countless resources that can aid you in your learning journey. Resources are sorted by tag to make them easier to find. You can also save resources to come back later.",
        },
        {
          title: "Classrooms",
          icon: classroomIcon,
          text: "You can sign up for classes here. Here you can also find the classes you are currently enrolled in and access assignments.",
        },
        {
          title: "Account Details",
          icon: gearIcon,
          text: "Here you can find and modify all of your account information like email, password, etc. Two Factor Authentication can also be set up and enabled.",
        },
      ];
      return (
        <div className={styles.wrapper}>
          <SideNavbar buttons={buttons} />
          <div className={styles.pageContent}>
              <h1>Workign</h1>
          </div>
        </div>
      );
}

export default MathPractice;