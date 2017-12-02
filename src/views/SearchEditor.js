import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import Button from "./Button";
import InputBase from "./InputBase";

import "./SearchEditor.css";

class SearchEditor extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    defaultValue: PropTypes.string,
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    autoFocus: false,
  };

  handleSubmit = event => {
    event.preventDefault();

    this.editor.blur();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.editor.value);
    }
  };

  render() {
    const { t, autoFocus, defaultValue } = this.props;
    return (
      <form className="SearchEditor" onSubmit={this.handleSubmit}>
        <InputBase
          innerRef={node => (this.editor = node)}
          className="SearchEditor-editor"
          autoFocus={autoFocus}
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
