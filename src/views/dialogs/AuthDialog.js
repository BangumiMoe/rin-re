import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { translate } from "react-i18next";

import Fade from "../transitions/Fade";
import Loader from "../Loader";
import Button from "../Button";
import TextField from "../TextField";
import Dialog, { DialogTitle, DialogContent, DialogActions } from "../Dialog";

import "./AuthDialog.css";

class AuthDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
  };
  static defaultProps = {
    open: true,
  };

  state = {
    loading: false,
    invalid: false,
    username: "",
    password: "",
  };

  get auth() {
    return this.props.store.auth;
  }

  handleUsernameChange = event => {
    this.setState({
      invalid: false,
      username: event.target.value,
    });
  };

  handlePasswordChange = event => {
    this.setState({
      invalid: false,
      password: event.target.value,
    });
  };

  handleRequestClose = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    try {
      const result = await this.auth.login({
        username: this.state.username,
        password: this.state.password,
      });

      if (result.success) {
        if (this.props.onRequestClose) {
          this.props.onRequestClose();
        }
      } else {
        this.setState({
          loading: false,
          invalid: true,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  handleExited = () => {
    // cleanup
    this.setState({
      loading: false,
      invalid: false,
      username: "",
      password: "",
    });
  };

  render() {
    const { t, open } = this.props;
    return (
      <Dialog
        className="AuthDialog"
        open={open}
        onRequestClose={this.handleRequestClose}
        onExited={this.handleExited}
      >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>{t("Login")}</DialogTitle>

          <DialogContent>
            <div>
              <TextField
                value={this.state.username}
                onChange={this.handleUsernameChange}
                id="AuthDialog-username"
                label={t("Username")}
                readOnly={this.state.loading}
                error={this.state.invalid}
                autoFocus
              />
            </div>
            <div>
              <TextField
                value={this.state.password}
                onChange={this.handlePasswordChange}
                id="AuthDialog-password"
                label={t("Password")}
                type="password"
                readOnly={this.state.loading}
                error={this.state.invalid}
                helperText={
                  this.state.invalid
                    ? t("Incorrect username or password")
                    : null
                }
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleRequestClose}>{t("Cancel")}</Button>
            <Button
              type="submit"
              disabled={this.state.loading || this.state.invalid}
            >
              {t("Login")}
            </Button>
          </DialogActions>

          <Fade in={this.state.loading} mountOnEnter unmountOnExit>
            <div className="AuthDialog-loader">
              <Loader />
            </div>
          </Fade>
        </form>
      </Dialog>
    );
  }
}

export default translate()(inject("store")(observer(AuthDialog)));
