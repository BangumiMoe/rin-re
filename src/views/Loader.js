import React from "react";

import "./Loader.css";

const Loader = () => (
  <span className="Loader">
    <svg className="Loader-box" viewBox="0 0 100 100">
      <circle
        className="Loader-circle"
        cx="50"
        cy="50"
        r="45"
        strokeWidth="10"
      />
    </svg>
  </span>
);

export default Loader;
