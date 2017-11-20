import React from "react";
import { translate } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";

import "./AppFooter.css";

const AppFooter = ({ t }) => (
  <footer className="AppFooter">
    <p>{t("Copyright")}</p>
    <p>
      <LanguageSwitcher />
    </p>
  </footer>
);

export default translate()(AppFooter);
