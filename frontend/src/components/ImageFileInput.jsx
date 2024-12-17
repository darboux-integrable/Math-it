import styles from "./image-file-input.module.css";

function ImageFileInput({ getImageSrc, setImageSrc }) {
  let background;

  async function openFilePicker() {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
          },
        },
      ],
    });

    const file = await fileHandle.getFile();
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = event.target.result;
      setImageSrc(imageData);

      background.src = imageData;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.container}>
      <img
        ref={background}
        className={styles.background}
        src={getImageSrc()}
      ></img>
      <div className={styles.inputSection}>
        <button
          className={styles.openButton}
          onclick={() => {
            openFilePicker();
          }}
        >
          Add Image
        </button>
      </div>
    </div>
  );
}

export default ImageFileInput;
