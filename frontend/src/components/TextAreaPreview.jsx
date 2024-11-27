import styles from "./text-area-preview.module.css";

// Takes in the name of the tag and returns the HTML template for that tag.
// Takes in the text value for that tag and adds it to the HTML template.
// Before it adds it to the HTML template, it checks for any tags nested in the text.
// These nested elements are accounted for and added the HTML template.
function elementLookUp(tag, textValue) {
  let element;

  let nestedElements = compileText(textValue);

	//console.log(textValue);

  switch (tag.toLowerCase()) {
    case "header":
      element = (
        <header className={styles.header}>
          {nestedElements.map((element) => {
            return element;
          })}
        </header>
      );
      break;
    case "bold":
      element = (
        <span className={styles.bold}>
          {nestedElements.map((element) => {
            return element;
          })}
        </span>
      );
      break;
    case "italic":
      element = (
        <span className={styles.italic}>
          {nestedElements.map((element) => {
            return element;
          })}
        </span>
      );
      break;
    case "orderedlist":
      element = (
        <div className={styles.orderedList}>
          {nestedElements.map((element) => {
            return element;
          })}
        </div>
      );
      break;
    case "unorderedlist":
      element = (
        <div className={styles.unorderedList}>
          {nestedElements.map((element) => {
            return element;
          })}
        </div>
      );
      break;
    case "table":
      element = (
        <div className={styles.table}>
          {nestedElements.map((element) => {
            return element;
          })}
        </div>
      );
      break;
		case "linebreak":
			element = (
				<br />
			);
			break;
    default:
      element = (
        <span className={styles.normalText}>
          {nestedElements.map((element) => {
            return element;
          })}
        </span>
      );
			break;
  }

  return element;
}

// If there is some error compiling the text, this should show.
function loadError(elements) {
  elements.push(
    <span className={styles.error}>
      Error Loading Preview. Make sure all tags are complete.
			Also make sure there is no whitespace inside of the tags.
    </span>
  );
}
// Compiles the variable string into its elements.
// It returns an array of the elements in the order they need to be loaded
function compileText(string) {
  const elements = [];

  if (string.indexOf("<") == -1 || string.indexOf(">") == -1) {
    return [string];
  }

  let stringCopy = string;

	let count = 0;
	const KILL_COUNT = 50;

  while (stringCopy.indexOf("<") != -1 && count < KILL_COUNT) {
		count++;
    const startIndex = stringCopy.indexOf("<");

    // Check for any text before the tag. This still should be included in the page. Just outside of any tag.
    // i.e. text before the tag <bold> Bold Text </bold>
    if (startIndex != 0) {
      elements.push(
        <span className={styles.normalText}>
          {stringCopy.substring(0, startIndex)}
        </span>
      );
    }
		
    if (stringCopy[startIndex + 1] != "/") {
      // Find the end of the opening tag
      const openingTagEnd = stringCopy.indexOf(">");

			// Check for error in the start index. 
      if (openingTagEnd == -1) {
				loadError();
        return elements;
      }

      // Get the tag name by getting the string between < and >
      const tagName = stringCopy.substring(startIndex + 1, openingTagEnd);
      let trimmedTagName = tagName.trim();


      // Find the end of the tag.
      const tagEndIndex = stringCopy.indexOf("</" + trimmedTagName);
			// Check for error in the end index. 
      if (tagEndIndex == -1) {
        loadError();
        return elements;
      }

      // Get the body of the tag by getting the text between the end of the start tag and start of ending tag.
      const tagBody = stringCopy.substring(openingTagEnd + 1, tagEndIndex);
			console.log(tagName + "|" + trimmedTagName + "|", tagBody);

      const newElement = elementLookUp(trimmedTagName, tagBody);
      elements.push(newElement);
       console.log(newElement, "\n");

      // Remove the tag we just found so we can search for a new tag.
      const newString = stringCopy.substring(tagEndIndex + 3 + tagName.length);
      //console.log(tagName,"|", tagBody, "|", stringCopy);
      //console.log(newString);
      stringCopy = newString;
    }
  }

  // Check for any text after the tag. This still needs to be included. Just not inside any tag.
  // i.e. <bold> Bold Text </bold> left over text.
  if (stringCopy.length > 0) {
    elements.push(<span className={styles.normalText}>{stringCopy}</span>);
  }

	if(count == KILL_COUNT){
		loadError(elements);
	}

  return elements;
}

function TextAreaPreview({ text }) {
  const elements = compileText(text);

	// Return the list of elements
  return (
    <div className="">
      {elements.map((element) => {
        return element;
      })}
    </div>
  );
}

export default TextAreaPreview;
