import styles from "./side-navbar.module.css";

import postIcon from "../assets/post.svg";
import puzzleIcon from "../assets/puzzle.svg";
import classroomIcon from "../assets/classroom.svg";
import gearIcon from "../assets/gear.svg";
import basic4Icon from "../assets/basic4.svg";

function SideNavbar() {
  let buttons = [
    {
      title: "Math Practice",
      icon: basic4Icon,
      text: "Hone your skills in many difference math subjects like algebra. The subjects are broken down by topic.",
      location: "/practice",
    },
    {
      title: "Math Discussion Forms",
      icon: postIcon,
      text: "Here you can post your questions and others can answer them. Answers from educators and tutors will show first to make sure you get the highest quality answer.",
      location: "/questions",
    },
    {
      title: "Resources",
      location: "/resources",
      icon: puzzleIcon,
      text: "Here you can find countless resources that can aid you in your learning journey. Resources are sorted by tag to make them easier to find. You can also save resources to come back later.",
    },
    {
      title: "Classrooms",
      icon: classroomIcon,
      text: "You can sign up for classes here. Here you can also find the classes you are currently enrolled in and access assignments.",
      location: "/classrooms/landing"
    },
    {
      title: "Account Home",
      icon: gearIcon,
      location: "/users/landing",
      text: "The Home Page/Hub where you can access things like classes questions and more.",
    },
  ];

  return (
    <div class={styles.navbar}>
      {buttons.map((button) => {
        // Each button has an icon, title, active, and text property
        return (
          <div className={styles.wrapper} onclick={() => {location.replace(button.location || "/")}}>
            <div className={styles.navSection}>
              <img
                src={button.icon}
                className={styles.sectionIcon}
                alt="Icon image"
              />

              <div className={styles.textSection}>
                <h2 className={styles.sectionTitle}>{button.title}</h2>
                <p className={styles.sectionText}>{button.text}</p>
              </div>
            </div>
            <div className={styles.sectionBackground}></div>
          </div>
        );
      })}
    </div>
  );
}

export default SideNavbar;
