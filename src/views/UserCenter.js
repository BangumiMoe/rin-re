import React from "react";
import { observer, inject } from "mobx-react";

import LoginDialog from "./dialogs/LoginDialog";

import "./UserCenter.css";

class UserCenter extends React.Component {
  state = {
    loginDialogOpen: false,
  };

  componentDidMount() {
    this.auth.load();
  }

  get auth() {
    return this.props.store.auth;
  }

  handleLogin = () => {
    this.setState({
      loginDialogOpen: true,
    });
  };

  handleLoginDialogRequestClose = () => {
    this.setState({
      loginDialogOpen: false,
    });
  };

  handleLogout = () => {
    this.auth.logout();
  };

  render() {
    const currentUser = this.auth.currentUser;
    return (
      <div>
        {this.auth.loaded &&
          (!currentUser ? (
            <div>
              <button onClick={this.handleLogin}>Login</button>
            </div>
          ) : (
            <div>
              <span>{currentUser.username}</span>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ))}

        <LoginDialog
          open={this.state.loginDialogOpen}
          onRequestClose={this.handleLoginDialogRequestClose}
        />
      </div>
    );
  }
}

export default inject("store")(observer(UserCenter));
