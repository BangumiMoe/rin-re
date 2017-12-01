import React from "react";

import "./Loader.css";

const Loader = () => (
  <span className="Loader">
    <svg className="Loader-box" viewBox="0 0 32 32">
      <circle
        className="Loader-circle"
        cx="16"
        cy="16"
        r="15"
        strokeWidth="2"
      />
    </svg>
  </span>
);

export default Loader;
