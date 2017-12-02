import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import Button from "./Button";
import InputBase from "./InputBase";

import "./SearchEditor.css";

class SearchEditor extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.editor.value);
    }
  };

  render() {
    const { t, defaultValue } = this.props;
    return (
      <form className="SearchEditor" onSubmit={this.handleSubmit}>
        <InputBase
          innerRef={node => (this.editor = node)}
          className="SearchEditor-editor"
          defaultValue={defaultValue}
        />
        <Button raised primary className="SearchEditor-button" type="submit">
          {t("Search")}
        </Button>
      </form>
    );
  }
}

export default translate()(SearchEditor);
