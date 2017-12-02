import React from "react";
import { translate } from "react-i18next";

import Button from "./Button";
import InputBase from "./InputBase";

import "./SearchEditor.css";

class SearchEditor extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="SearchEditor">
        <InputBase className="SearchEditor-editor" />
        <Button raised primary className="SearchEditor-button">
          {t("Search")}
        </Button>
      </div>
    );
  }
}

export default translate()(SearchEditor);
