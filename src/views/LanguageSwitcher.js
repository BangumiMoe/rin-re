import React from "react";
import { translate } from "react-i18next";

import Button from "material-ui/Button";
import List, { ListItem } from "material-ui/List";
import Dialog, { DialogTitle } from "material-ui/Dialog";
import Language from "material-ui-icons/Language";

import "./LanguageSwitcher.css";

const LANGUAGES = [
  { language: "en", text: "Language" },
  { language: "zh-Hans", text: "简体中文" },
];

class LanguageSwitcher extends React.Component {
  state = {
    dialogOpen: false,
  };

  handleClick = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogRequestClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleRequestChange = language => {
    this.setState({
      dialogOpen: false,
    });
    this.props.i18n.changeLanguage(language);
  };

  render() {
    const t = this.props.t;
    return [
      <Button
        key="button"
        className="LanguageSwitcher"
        dense
        color="inherit"
        onClick={this.handleClick}
      >
        <span className="LanguageSwitcher-layout">
          <Language className="LanguageSwitcher-icon" />
          <span>{t("Change Language")}</span>
        </span>
      </Button>,

      <Dialog
        key="dialog"
        open={this.state.dialogOpen}
        onRequestClose={this.handleDialogRequestClose}
      >
        <DialogTitle>{t("Language")}</DialogTitle>
        <List className="LanguageSwitcher-list">
          {LANGUAGES.map(({ language, text }) => (
            <ListItem
              key={language}
              className="LanguageSwitcher-item"
              button
              onClick={() => this.handleRequestChange(language)}
            >
              {text}
            </ListItem>
          ))}
        </List>
      </Dialog>,
    ];
  }
}

export default translate()(LanguageSwitcher);
