import React from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

import SearchIcon from "react-icons/lib/md/search";

import ButtonBase from "./ButtonBase";
import IconButton from "./IconButton";
import LanguageSwitcher from "./LanguageSwitcher";
import UserCenter from "./UserCenter";

import "./AppHeader.css";

const AppHeader = ({ t }) => (
  <header className="AppHeader">
    <div className="AppHeader-main">
      <ButtonBase component={Link} className="AppHeader-home" to="/">
        <h1 className="AppHeader-logo">{t("Bangumi Moe")}</h1>
      </ButtonBase>
      <nav className="AppHeader-nav">
        <ul className="AppHeader-navList">
          <li className="AppHeader-navItem">
            <ButtonBase
              ripple={{ center: true }}
              component={Link}
              className="AppHeader-navLink"
              to="/bangumi/list"
            >
              {t("Bangumi List")}
            </ButtonBase>
          </li>
        </ul>
      </nav>
    </div>
    <div className="AppHeader-side">
      <ul className="AppHeader-actions">
        <li className="AppHeader-action">
          <IconButton
            className="AppHeader-search"
            component={Link}
            to="/search"
            aria-label={t("Search")}
          >
            <SearchIcon />
          </IconButton>
        </li>
        <li className="AppHeader-action">
          <LanguageSwitcher />
        </li>
        <li className="AppHeader-action">
          <UserCenter />
        </li>
      </ul>
    </div>
  </header>
);

export default translate()(AppHeader);
