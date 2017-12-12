import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import Button from "./Button";
import SearchEditor from "./SearchEditor";

import "./SearchBar.css";

class SearchBar extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    autoFocus: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    autoFocus: false,
  };

  submit() {
    this.editor.blur();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.editor.value);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.submit();
  };

  handleEditorSubmit = () => {
    this.submit();
  };

  render() {
    const { t, defaultValue, autoFocus } = this.props;
    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <div className="SearchBar-editor">
          <SearchEditor
            ref={node => (this.editor = node)}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            onSubmit={this.handleEditorSubmit}
          />
        </div>
        <Button raised primary className="SearchBar-button" type="submit">
          {t("Search")}
        </Button>
      </form>
    );
  }
}

export default translate()(SearchBar);
