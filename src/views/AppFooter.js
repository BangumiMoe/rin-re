import React from "react";
import { translate } from "react-i18next";

import "./AppFooter.css";

const AppFooter = ({ t }) => (
  <footer className="AppFooter">
    <p>{t("Copyright")}</p>
  </footer>
);

export default translate()(AppFooter);
