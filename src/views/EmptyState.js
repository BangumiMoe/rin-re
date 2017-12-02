import React from "react";
import { translate } from "react-i18next";

import "./EmptyState.css";

const EmptyState = ({ t }) => (
  <div className="EmptyState">
    <div className="EmptyState-status">{t("No Results")}</div>
  </div>
);

export default translate()(EmptyState);
