import { useEffect, useState } from "react";
import React from "react";
import backgroundImage from "../static/backgroundimage1.jpg";

import Arrow from "./downArrowAnimated/arrow";

function Home({ props }) {
  const {  page2Ref, scrollToGivenDiv } = props;

  const [text, setText] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [renderArrow, setRenderArrow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const targetText =
      "Experience the latest AI-generated artwork that can be created from a sketch.";
    let currentIndex = 0;

    const interval = setInterval(() => {
      setText(targetText.slice(0, currentIndex + 1));
      currentIndex += 1;

      if (currentIndex === targetText.length) {
        setRenderArrow(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const textStyle = {
    fontSize: "50px",
    textShadow: "rgb(0 0 0) 1px 1px 10px",
    color: "floralwhite",
    fontFamily: "'Orbitron', sans-serif",
  };

  return (
    <div ref={page2Ref}>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h1
            className=""
            style={{ ...textStyle, textAlign: "center", margin: "0 100px" }}
          >
            {text}
            {isCursorVisible && "|"}
          </h1>
          <div
            className={renderArrow ? "nothing" : "vis-hidden"}
            style={{ marginTop: "100px" }}
          >
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
