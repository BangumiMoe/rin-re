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
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
        onExited={this.handleExited}
      >
        <form className="LoginDialog" onSubmit={this.handleSubmit}>
          <DialogTitle>Login</DialogTitle>

          <DialogContent>
            <div>
              <TextField
                value={this.state.username}
                onChange={this.handleUsernameChange}
                label="Username"
                fullWidth
                margin="dense"
                autoFocus
                error={this.state.invalid}
              />
            </div>
            <div>
              <TextField
                value={this.state.password}
                onChange={this.handlePasswordChange}
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                error={this.state.invalid}
                helperText={
                  this.state.invalid ? "Incorrect username or password." : null
                }
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleRequestClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={this.state.loading || this.state.invalid}
            >
              Login
            </Button>
          </DialogActions>

          <Fade in={this.state.loading} mountOnEnter unmountOnExit>
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
