import React from "react";
import { observer, inject } from "mobx-react";

import { TransitionGroup } from "react-transition-group";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Tooltip from "material-ui/Tooltip";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Person from "material-ui-icons/Person";

import Fade from "./transitions/Fade";
import LoginDialog from "./dialogs/LoginDialog";

import "./UserCenter.css";

class UserCenter extends React.Component {
  state = {
    menuOpen: false,
    menuAnchorPosition: null,
    loginDialogOpen: false,
  };

  componentDidMount() {
    this.auth.load();
  }

  get auth() {
    return this.props.store.auth;
  }

  handleActionClick = event => {
    const anchor = event.target.closest("button");
    const rect = anchor.getBoundingClientRect();
    this.setState({
      menuOpen: true,
      menuAnchorPosition: { left: rect.right, top: rect.bottom },
    });
  };

  handleMenuRequestClose = () => {
    this.setState({
      menuOpen: false,
      menuAnchorPosition: null,
    });
  };

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
    this.handleMenuRequestClose();
    this.auth.logout();
  };

  render() {
    const currentUser = this.auth.currentUser;
    console.log(this.auth.state, this.auth.loaded, currentUser);
    return (
      <TransitionGroup className="UserCenter">
        {this.auth.loaded &&
          (!currentUser ? (
            <Fade key="guest">
              <div className="UserCenter-layout">
                <div className="UserCenter-action">
                  <Tooltip title="Login">
                    <IconButton
                      color="inherit"
                      aria-label="Login"
                      onClick={this.handleLogin}
                    >
                      <Person />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Fade>
          ) : (
            <Fade key="user">
              <div className="UserCenter-layout">
                <div className="UserCenter-action">
                  <IconButton
                    color="inherit"
                    aria-label="User Menu"
                    aria-haspopup="true"
                    aria-owns="UserCenter-menu"
                    disabled={this.auth.state === "loading"}
                    onClick={this.handleActionClick}
                  >
                    <div className="UserCenter-avatar">
                      <img src={currentUser.avatar} alt="User Avatar" />
                    </div>
                  </IconButton>
                  <Fade
                    in={this.auth.state === "loading"}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className="UserCenter-actionLoader">
                      <CircularProgress
                        color="inherit"
                        size={48}
                        thickness={2}
                      />
                    </div>
                  </Fade>
                  <Menu
                    id="UserCenter-menu"
                    open={this.state.menuOpen}
                    anchorReference={"anchorPosition"}
                    anchorPosition={this.state.menuAnchorPosition}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    onRequestClose={this.handleMenuRequestClose}
                  >
                    <MenuItem onClick={this.handleMenuRequestClose}>
                      Publish
                    </MenuItem>
                    <MenuItem onClick={this.handleMenuRequestClose}>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
                <div className="UserCenter-username">
                  {currentUser.username}
                </div>
              </div>
            </Fade>
          ))}

        <LoginDialog
          open={this.state.loginDialogOpen}
          onRequestClose={this.handleLoginDialogRequestClose}
        />
      </TransitionGroup>
    );
  }
}

export default inject("store")(observer(UserCenter));
