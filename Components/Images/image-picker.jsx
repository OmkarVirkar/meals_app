"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const pickref = useRef();
  const [pickedImage, setPickedImage] = useState();

  function handlePickClick() {
    pickref.current.click();
  }
  function onImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function () {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Preview" fill />}
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          required
          className={classes.input}
          ref={pickref}
          onChange={(e) => onImageChange(e)}
        />
        <button
          type="button"
          className={classes.button}
          onClick={() => handlePickClick()}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
