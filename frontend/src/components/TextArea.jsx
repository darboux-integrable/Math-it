import styles from "./text-area.module.css";
import italicIcon from "../assets/italic-icon.svg";
import boldIcon from "../assets/bold-icon.svg";
import headingIcon from "../assets/heading-icon.svg";
import horzontalLineIcon from "../assets/horizontal-line.svg";
import orderedListIcon from "../assets/ordered-list.svg";
import unorderedListIcon from "../assets/unordered-list.svg";
import richTextIcon from "../assets/rich-text.svg";
import markdownIcon from "../assets/markdown-icon.svg";
import underlineIcon from "../assets/underline-icon.svg";
import helpIcon from "../assets/question-icon.svg";
import tableIcon from "../assets/table-icon.svg";
import { createSignal, Show } from "solid-js";
import TextAreaPreview from "./TextAreaPreview";

let timeoutFunction; // Must stay as a global variable 

function HeaderButton(props) {

  const addSentinelToText = () => {
    const startIndex = props.textArea.selectionStart;
    const endIndex = props.textArea.selectionEnd;

    const newText =
      props.textArea.value.substring(0, startIndex) +
      props.sentinel +
      props.textArea.value.substring(endIndex);

    props.setCurrentText(newText);
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
        src={props.image}
        alt=""
        className={`${styles.topSectionButtonImage} ${
          !props.sentinel && props.about != "Help" && !props.togglePreviewVal // Set the markdown button to active by default
            ? styles.activeDisplay
            : " "
        }`}
        onclick={(e) => {
          if (props.sentinel) {
            addSentinelToText();
          } else if (props.about == "Help") {
            window.open("/help/textArea");
          } else {
            toggleDisplay(e);
            props.setTogglePreview(props.togglePreviewVal);
            props.textArea.value += " ";
          }
        }}
        onmouseenter={() => {
          clearTimeout(timeoutFunction);
          props.textArea.className = styles.textArea + " " + styles.hovered;
        }}
        onmouseleave={() => {
          timeoutFunction = setTimeout(() => {
            props.textArea.className =
              styles.textArea + " " + styles.notHovered;
          }, 750);
        }}
      />

      <div className={styles.buttonAboutWrapper}>
        <p className={styles.buttonAboutText}>{props.about}</p>
      </div>
    </div>
  );
}

function TextArea({currentText, setCurrentText}) {

  const [togglePreview, setTogglePreview] = createSignal(false);

  let textArea = (
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
    ></textarea>
  );

  return (
    <>
      <div className={styles.textAreaWrapper}>
        <div className={styles.topSection}>
          <div className={styles.topLeftContent}>
            <div className={styles.fontOptions}>
              <HeaderButton
                textArea={textArea}
                image={headingIcon}
                about={"Make a Heading"}
                sentinel={"<header>Your Text</header>"}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={boldIcon}
                about={"Bold"}
                sentinel={"<bold>Your Text</bold>"}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={italicIcon}
                about={"Italic"}
                sentinel={"<italic>Your Text</italic>"}
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={underlineIcon}
                about={"Underline"}
                sentinel={"<underline>Your Text</underline>"}
                setCurrentText={setCurrentText}
              />
            </div>
            <div className={styles.displaysButtons}>
              <HeaderButton
                textArea={textArea}
                image={orderedListIcon}
                about={"Add Ordered List"}
                sentinel={
                  "<orderedList>\n<listItem>Item 1</listItem>\n<listItem>Item 2</listItem>\n<listItem>Item 3</listItem>\n</orderedList>\n"
                }
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={unorderedListIcon}
                about={"Add Unordered List"}
                sentinel={
                  "<unorderedList>\n<listItem>Item 1</listItem>\n<listItem>Item 2</listItem>\n<listItem>Item 3</listItem>\n</unorderedList>\n"
                }
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={tableIcon}
                about={"Add a Table"}
                sentinel={
                  "<table>\n<tColumn>\n<tHeader>Column 1</tHeader>\n<tItem>Item 1</tItem>\n<tItem>Item 2</tItem>\n</tColumn>\n<tColumn>\n<tHeader>Column 2</tHeader>\n<tItem>Item 3</tItem>\n<tItem>Item 4</tItem>\n</tColumn>\n</table>\n"
                }
                setCurrentText={setCurrentText}
              />
              <HeaderButton
                textArea={textArea}
                image={horzontalLineIcon}
                about={"Add Horizontal Bar"}
                sentinel={"<horizontalBar></horizontalBar>"}
                setCurrentText={setCurrentText}
              />
            </div>
            <div className={styles.helpButtons}>
              <HeaderButton
                textArea={textArea}
                image={helpIcon}
                about={"Help"}
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
              image={markdownIcon}
              textArea={textArea}
              about={"View Mark Down Only"}
              togglePreviewVal={false}
              setTogglePreview={setTogglePreview}
            />
          </div>
        </div>
        <div className={styles.bottomSection}>{textArea}</div>
      </div>

      <Show when={togglePreview()}>
        <TextAreaPreview
          // Ordered List and UnorderedList Examples
          //text={
          //  "<orderedList1> <listItem1> My First List <orderedList2> <listItem>More List Items</listItem> <listItem>More List Items</listItem> <listItem>More List Items</listItem> </orderedList2> </listItem1> <listItem1>My Second List <unorderedList> <listItem>My list Item</listItem> <listItem>My list Item</listItem> <listItem>My list Item</listItem> </unorderedList> </listItem1> <listItem>More List Items</listItem>  </orderedList1>"
          //}

          // Table example
          //text={
          //  "<table> <tColumn> <tHeader>Column 1</tHeader> <tItem> <unorderedList> <listItem>List Item 1</listItem> <listItem>List Item 2</listItem> <listItem>List Item 3</listItem> </unorderedList> </tItem> <tItem>Item 2</tItem> </tColumn> <tColumn> <tHeader>Column 2</tHeader> <tItem>Item 3</tItem> <tItem> Item 4</tItem></tColumn>  </table>"
          //}

          getText={currentText}
        />
      </Show>
    </>
  );
}

export default TextArea;

// <a href="https://www.flaticon.com/free-icons/pi" title="Pi icons">Pi icons created by bearicons - Flaticon</a>
