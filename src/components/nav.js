import React from "react";

function Navbar({ props }) {
  const { page2Ref, scrollToGivenDiv } = props;

  return (
    <nav
      style={{
        zIndex: "2",
        height: "30px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="navbar-left">
        <h1>Color My Anime</h1>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <div
              onClick={() => scrollToGivenDiv(page2Ref)}
              style={{ transition: "color 0.3s ease", cursor: "pointer" }}
            >
              <a>Try It Out</a>
            </div>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/laxmi-kanth-reddy-a5a949217/"
              target="next"
            >
              Contact Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
