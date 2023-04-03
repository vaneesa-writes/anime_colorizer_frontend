import React, { useEffect, useState } from "react";
import "./styles.css";
function ImageGrid({ images, setPreview, setSelectedFile, setDetected }) {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    setAllImages(images);
  }, []);

  const func = (img_src) => {
    setDetected(undefined);
    console.log("clicked Image " + typeof img_src);

    fetch(img_src)
      .then(async function (response) {
        // console.log(response);
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], img_src, { contentType });
        console.log("last", file);
        return { file, blob };
      })
      .then(function (response) {
        var objectURL = URL.createObjectURL(response.blob);
        setPreview(objectURL);
        setSelectedFile(response.file);
        console.log(objectURL);
      });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridGap: "10px",
        margin: "15px",
      }}
    >
      {allImages.map((image, index) => (
        <div className="flash-image-container" key={index}>
          <img
            className="flash-image"
            key={index}
            src={image.src}
            alt={image.alt}
            style={{
              width: "100px",
              height: "120px",
              cursor: "pointer",
            }}
            onClick={() => func(image.src)}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
