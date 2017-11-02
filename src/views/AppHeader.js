import React from "react";
import { Link } from "react-router-dom";

import "./AppHeader.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className="AppHeader">
        <Link className="AppHeader-home" to="/">
          <h1 className="AppHeader-logo">Bangumi Moe</h1>
        </Link>
      </header>
    );
  }
}

export default AppHeader;
