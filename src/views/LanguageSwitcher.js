import React from "react";
import { translate } from "react-i18next";

import LanguageIcon from "react-icons/lib/md/language";

import IconButton from "./IconButton";
import List, { ListItem } from "./List";
import Dialog, { DialogTitle } from "./Dialog";

import "./LanguageSwitcher.css";

const LANGUAGES = [
  { language: "en", text: "English" },
  { language: "zh-Hans", text: "简体中文" },
  { language: "zh-Hant", text: "繁體中文" },
  { language: "ja", text: "日本語" },
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
    const { t } = this.props;
    return (
      <React.Fragment>
        <IconButton
          className="LanguageSwitcher"
          aria-label={t("Change Language")}
          onClick={this.handleClick}
        >
          <LanguageIcon />
        </IconButton>

        <Dialog
          className="LanguageSwitcher-dialog"
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogRequestClose}
        >
          <DialogTitle>{t("Language")}</DialogTitle>
          <List>
            {LANGUAGES.map(({ language, text }) => (
              <ListItem
                key={language}
                onClick={() => this.handleRequestChange(language)}
              >
                {text}
              </ListItem>
            ))}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default translate()(LanguageSwitcher);
