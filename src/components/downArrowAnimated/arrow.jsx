import React from "react";
import "./styles.css";
const Arrow = () => {
  return (
    <div>
      <div className="arrow bounce">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="#fff"
            d="M12 17.293l-6.646-6.647a.999.999 0 1 1 1.414-1.414L12 14.464l5.232-5.232a.999.999 0 1 1 1.414 1.414L12 17.293z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Arrow;
