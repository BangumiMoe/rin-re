import React from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

import ButtonBase from "./ButtonBase";
import LanguageSwitcher from "./LanguageSwitcher";
import UserCenter from "./UserCenter";

import "./AppHeader.css";

const AppHeader = ({ t }) => (
  <header className="AppHeader">
    <div className="AppHeader-main">
      <ButtonBase
        ripple={{ center: true }}
        component={Link}
        className="AppHeader-home"
        to="/"
      >
        <h1 className="AppHeader-logo">{t("Bangumi Moe")}</h1>
      </ButtonBase>
    </div>
    <div className="AppHeader-side">
      <div className="AppHeader-sideItem">
        <LanguageSwitcher />
      </div>
      <div className="AppHeader-sideItem">
        <UserCenter />
      </div>
    </div>
  </header>
);

export default translate()(AppHeader);
