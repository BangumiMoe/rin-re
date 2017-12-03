import React from "react";
import { translate } from "react-i18next";

import "./ErrorState.css";

const ErrorState = ({ t }) => (
  <div className="ErrorState">
    <div className="ErrorState-status">{t("Network Error")}</div>
  </div>
);

export default translate()(ErrorState);
