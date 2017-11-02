import React from "react";
import { Link } from "react-router-dom";

import "./AppHeader.css";

const AppHeader = () => (
  <header className="AppHeader">
    <Link className="AppHeader-home" to="/">
      <h1 className="AppHeader-logo">Bangumi Moe</h1>
    </Link>
  </header>
);

export default AppHeader;
