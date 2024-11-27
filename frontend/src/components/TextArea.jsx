import styles from "./text-area.module.css";
import italicIcon from "../assets/italic-icon.svg";
import boldIcon from "../assets/bold-icon.svg";
import headingIcon from "../assets/heading-icon.svg";
import piIcon from "../assets/pi.png";
import horzontalLineIcon from "../assets/horizontal-line.svg";
import orderedListIcon from "../assets/ordered-list.svg";
import unorderedListIcon from "../assets/unordered-list.svg";
import richTextIcon from "../assets/rich-text.svg";
import markdownIcon from "../assets/markdown-icon.svg";
import { createSignal } from "solid-js";
import TextAreaPreview from "./TextAreaPreview";

let timeoutFunction;

function HeaderButton({
  image,
  about,
  sentinel,
  getCurrentText,
  setCurrentText,
  togglePreviewVal, 
  setTogglePreview
}) {

  const addSentinelToText = () => {
    setCurrentText(getCurrentText() + " " + sentinel + " ");
  };

  // Swaps the green color of the two buttons. 
  const toggleDisplay = (e) => {
    const grandparent = e.target.parentElement.parentElement;

    const allParents = new Array(...grandparent.children);

    for (let i = 0; i < allParents.length; i++) {
      const children = new Array(...allParents[i].children);
      if (allParents[i] == e.target.parentElement) {
        children[0].className += " " + styles.activeDisplay;
      } else {
        children[0].className = styles.topSectionButtonImage;
      }
    }
  };

  return (
    <div className={styles.topSectionButtonWrapper}>
      <img
        src={image}
        alt=""
        className={styles.topSectionButtonImage}

        onclick={(e) => {
          if (sentinel) {
            addSentinelToText();
          } else {
            toggleDisplay(e);
            setTogglePreview(togglePreviewVal);
          }
        }}

        onmouseenter={() => {
          clearTimeout(timeoutFunction);
          const textArea = document.getElementById("textArea");
          textArea.className = styles.textArea + " " + styles.hovered;
        }}

        onmouseleave={() => {
          clearInterval(timeoutFunction);
          const textArea = document.getElementById("textArea");
          timeoutFunction = setTimeout(() => {
            textArea.className = styles.textArea + " " + styles.notHovered;
          }, 750)
        }}
      />

      <div className={styles.buttonAboutWrapper}>
        <p className={styles.buttonAboutText}>{about}</p>
      </div>
    </div>
  );
}

function TextArea() {
  const [currentText, setCurrentText] = createSignal("");

  const [togglePreview, setTogglePreview] = createSignal(false);

  let textArea;

  return (
    <div className={styles.textAreaWrapper}>
      <div className={styles.topSection}>
        <div className={styles.topLeftContent}>
          <div className={styles.fontOptions}>
            <HeaderButton
              textArea={textArea}
              image={headingIcon}
              about={"Make a Heading"}
              sentinel={"<heading>Your Text</heading>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
            <HeaderButton
              textArea={textArea}
              image={boldIcon}
              about={"Make Text Bold"}
              sentinel={"<bold>Your Text</bold>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
            <HeaderButton
              textArea={textArea}
              image={italicIcon}
              about={"Make Text Italic"}
              sentinel={"<italic>Your Text</italic>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
          </div>
          <div className={styles.mathOptionsButtons}>
            <HeaderButton
              textArea={textArea}
              image={piIcon}
              about={"Add MathJax"}
              sentinel={"<math>Your Text</math>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
          </div>
          <div className={styles.displaysButtons}>
            <HeaderButton
              textArea={textArea}
              image={orderedListIcon}
              about={"Add Ordered List"}
              sentinel={"<orderedList>Your Text</orderedList>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
            <HeaderButton
              textArea={textArea}
              image={unorderedListIcon}
              about={"Add Unordered List"}
              sentinel={"<unorderedList>Your Text</unorderedList>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
            <HeaderButton
              textArea={textArea}
              image={horzontalLineIcon}
              about={"Add Horizontal Bar"}
              sentinel={"<horizontalBar></horizontalBar>"}
              getCurrentText={currentText}
              setCurrentText={setCurrentText}
            />
          </div>
        </div>
        <div className={styles.topRightContent}>
          <HeaderButton
            textArea={textArea}
            image={richTextIcon}
            about={"View Preview"}
            togglePreviewVal={true}
            setTogglePreview={setTogglePreview}
          />
          <HeaderButton
            textArea={textArea}
            image={markdownIcon}
            about={"View Mark Down Only"}
            togglePreviewVal={false}
            setTogglePreview={setTogglePreview}
          />
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
          id="textArea"
          cols="30"
          rows="10"
          ref={textArea}
        ></textarea>
      </div>

      <TextAreaPreview text={"<bold>Working Bold <linebreak></linebreak>Text <italic>also bold and Italic</italic> </bold> <italic>normal Text</italic>"} />
    </div>
  );
}

export default TextArea;

// <a href="https://www.flaticon.com/free-icons/pi" title="Pi icons">Pi icons created by bearicons - Flaticon</a>
