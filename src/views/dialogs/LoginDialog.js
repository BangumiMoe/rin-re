import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import CircularProgress from "material-ui/Progress/CircularProgress";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "material-ui/Dialog";

import Fade from "../transitions/Fade";

import "./LoginDialog.css";

class LoginDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
  };
  static defaultProps = {
    open: true,
  };

  state = {};

  get auth() {
    return this.props.store.auth;
  }

  handleRequestClose = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    this.auth
      .login({
        username: this.username.value,
        password: this.password.value,
      })
      .then(() => {
        if (this.props.onRequestClose) {
          this.props.onRequestClose();
        }
      });
  };

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.handleRequestClose}>
        <form className="LoginDialog" onSubmit={this.handleSubmit}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                inputRef={node => (this.username = node)}
                label="Username"
                margin="dense"
                autoFocus
              />
            </div>
            <div>
              <TextField
                inputRef={node => (this.password = node)}
                type="password"
                label="Password"
                margin="dense"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose}>Cancel</Button>
            <Button type="submit" disabled={this.auth.state === "loading"}>
              Login
            </Button>
          </DialogActions>

          <Fade in={this.auth.state === "loading"} mountOnEnter unmountOnExit>
            <div className="LoginDialog-loader">
              <CircularProgress />
            </div>
          </Fade>
        </form>
      </Dialog>
    );
  }
}

export default inject("store")(observer(LoginDialog));
