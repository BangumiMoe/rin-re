import React from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";
import UserCenter from "./UserCenter";

import "./AppHeader.css";

const AppHeader = ({ t }) => (
  <header className="AppHeader">
    <Link className="AppHeader-home" to="/">
      <h1 className="AppHeader-logo">{t("Bangumi Moe")}</h1>
    </Link>
    <div className="AppHeader-side">
      <LanguageSwitcher />
    </div>
    <div className="AppHeader-side">
      <UserCenter />
    </div>
  </header>
);

export default translate()(AppHeader);
