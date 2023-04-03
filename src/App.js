import "./App.css";
import Navbar from "./components/nav";
import Home from "./components/home";
import Predict from "./components/predict";
import { useRef, useEffect } from "react";

function App() {
  const page2Ref = useRef(null);

  // useEffect(() => {
  //   document.body.style.zoom = "125%";
  // }, []);
  const scrollToGivenDiv = (scrollToDiv) => {
    scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
  };
  const props = { page2Ref, scrollToGivenDiv };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar props={props} />
      <Home props={props} />
      <Predict props={props} />
    </div>
  );
}

export default App;
