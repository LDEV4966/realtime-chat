import React, { useEffect, useState } from "react";

import "./ImageFile.css";

const ImageFile = ({ fileName, blob }) => {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImageSrc(result);
    };
  });
  return (
    <div className="imageFile-container">
      <span className="fileName">{fileName}</span>
      <img className="fileImg" src={imageSrc} alt={fileName} />
    </div>
  );
};
export default ImageFile;
