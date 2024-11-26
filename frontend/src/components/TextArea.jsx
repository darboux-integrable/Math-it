import styles from "./text-area.module.css";
import italicIcon from "../assets/italic-icon.svg";
import boldIcon from "../assets/bold-icon.svg";
import headingIcon from "../assets/heading-icon.svg";
import piIcon from "../assets/pi.png";
import horzontalLineIcon from "../assets/horizontal-line.svg";
import orderedListIcon from "../assets/ordered-list.svg";
import unorderedListIcon from "../assets/unordered-list.svg";
import { createSignal } from "solid-js";

function HeaderButton({
  image,
  about,
  sentinel,
  getCurrentText,
  setCurrentText,
}) {
  const addSentinelToText = () => {
    setCurrentText(getCurrentText() + " " + sentinel + " ");
  };

  return (
    <div
      className={styles.topSectionButtonWrapper}
      onclick={() => {
        addSentinelToText();
      }}
    >
      <img src={image} alt="" className={styles.topSectionButtonImage} />

      <div className={styles.buttonAboutWrapper}>
        <p className={styles.buttonAboutText}>{about}</p>
      </div>
    </div>
  );
}

function TextArea() {
  const topButtons = [
    {
      image: headingIcon,
      about: "Add Heading",
      sentinel: "##",
    },
    {
      image: boldIcon,
      about: "Make Text Bold",
      sentinel: "**",
    },
    {
      image: italicIcon,
      about: "Make Text Italicized",
      sentinel: "~~",
    },
    {
      image: piIcon,
      about: "Add Mathjax",
      sentinel: "$$",
    },
    // Sentinel values are subject to change.
    {
      image: orderedListIcon,
      about: "Make an Ordered List",
      sentinel: "<>",
    },
    {
      image: unorderedListIcon,
      about: "Make an Unordered List",
      sentinel: "/?",
    },
    {
      image: horzontalLineIcon,
      about: "Add a Horizontal Line",
      sentinel: "---",
    },
  ];

  const [currentText, setCurrentText] = createSignal("");

  return (
    <div className={styles.textAreaWrapper}>
      <div className={styles.topSection}>
        <div className={styles.topLeftContent}>
            <div className={styles.fontOptions}>
              <HeaderButton
                image={headingIcon}
                about={"Make a Heading"}
                sentinel={"###"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                image={boldIcon}
                about={"Make Text Bold"}
                sentinel={"***"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                image={italicIcon}
                about={"Make Text Italic"}
                sentinel={"~~~"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
            </div>
            <div className={styles.mathOptionsButtons}>
              <HeaderButton
                image={piIcon}
                about={"Add MathJax"}
                sentinel={"$$$"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
            </div>
            <div className={styles.displaysButtons}>
              <HeaderButton
                image={orderedListIcon}
                about={"Add Ordered List"}
                sentinel={"<<<"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                image={unorderedListIcon}
                about={"Add Unordered List"}
                sentinel={">>>"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                image={horzontalLineIcon}
                about={"Add Horizontal Bar"}
                sentinel={"---"}
                getCurrentText={currentText}
                setCurrentText={setCurrentText}
              />
            </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <textarea
          className={styles.textArea}
          oninput={(e) => {
            setCurrentText(e.target.value);
          }}
          value={currentText()}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}

export default TextArea;

// <a href="https://www.flaticon.com/free-icons/pi" title="Pi icons">Pi icons created by bearicons - Flaticon</a>
