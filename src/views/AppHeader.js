import React from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

import UserCenter from "./UserCenter";

import "./AppHeader.css";

const AppHeader = ({ t }) => (
  <header className="AppHeader">
    <UserCenter />
    <Link className="AppHeader-home" to="/">
      <h1 className="AppHeader-logo">{t("Bangumi Moe")}</h1>
    </Link>
  </header>
);

export default translate()(AppHeader);
