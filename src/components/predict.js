import { useEffect, useRef, useState } from "react";
import axios from "axios";
import React from "react";
import ImageGrid from "./ImageGrid";
import "./predict.css";
import ReactLoading from "react-loading";

const Predict = ({ props }) => {
  const { page2Ref, scrollToGivenDiv } = props;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [detected, setDetected] = useState();
  const [processing1, setProcessing1] = useState(false);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setDetected();
    console.log("yo", typeof e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      setDetected(undefined);
      return;
    }
    console.log(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log("objectURL " + objectUrl);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  var img_paths = [];
  var img_blobs = [];

  const getImagePaths = () => {
    const imageContext = require.context(
      "../static/ImageGrid",
      true,
      /\.(png|jpg|jpeg|gif)$/
    );
    img_paths.length = 0;
    imageContext.keys().forEach(async (imagePath) => {
      console.log(imagePath);
      img_paths.push({
        src: imageContext(imagePath),
        alt: "",
      });
    });
  };

  useEffect(getImagePaths, []);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log("type of se;lected file", typeof selectedFile);
    console.log("type of se;lected file", typeof preview);
  }, [selectedFile, preview]);

  async function detect() {
    console.log("in detect " + selectedFile);
    setProcessing1(true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Origin: "http://localhost:8000",
      },
    };
    let formData = new FormData();
    console.log("here");
    console.log(typeof preview);
    console.log(typeof selectedFile);
    formData.append("file", selectedFile);

    axios
      .post("https://343f-183-82-46-36.in.ngrok.io/colorize", formData, config)

      .then((res) => {
        console.log(res);
        console.log(res.data);
        var encode_image = res.data.image;

        setDetected("data:image/png;base64," + encode_image);
        setProcessing1(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div ref={page2Ref}>
      <div
        style={{
          backgroundColor: "#745b44",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "30px",
                textShadow: "rgb(0 0 0) 1px 1px 10px",
                color: "floralwhite",
              }}
            >
              Give It A Try
            </h3>
          </div>

          <div className="stage" style={{ marginTop: "10px" }}>
            <button className="btn" onClick={handleButtonClick}>
              Upload Image
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelectFile}
          />

          <div style={{ margin: "5px" }}>
            <p style={{ color: "white", textAlign: "center" }}>
              Or select on one of the following example images
            </p>
            <div>
              <ImageGrid
                images={img_paths}
                setPreview={setPreview}
                setSelectedFile={setSelectedFile}
                setDetected={setDetected}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div
          style={{
            width: "600px",
            height: "100vh",
            alignItems: "center",
            marginLeft: "20px",
            display: "flex",
          }}
        >
          {preview && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "100px",
              }}
            >
              <img
                src={preview}
                style={{ maxWidth: "256px", maxHeight: "256px" }}
              />
              <ul
                className="SubmitButton"
                style={{ cursor: "pointer" }}
                onClick={detect}
              >
                <li>
                  Colorize Sketch
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </div>
          )}
          <div style={{ marginLeft: "40px", marginTop: "14px" }}>
            {!processing1 ? (
              <img
                src={detected}
                style={{ maxWidth: "256px", maxHeight: "256px" }}
              />
            ) : (
              <div
                style={{
                  height: "300px",
                  width: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactLoading
                  type="bubbles"
                  color="#FFF"
                  height={100}
                  width={100}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
