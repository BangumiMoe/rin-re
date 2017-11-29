import React from "react";
import { observer, inject } from "mobx-react";
import { translate } from "react-i18next";

import Person from "react-icons/lib/md/person";
import { TransitionGroup } from "react-transition-group";
import CircularProgress from "material-ui/Progress/CircularProgress";

import * as link from "../utils/link";

import Fade from "./transitions/Fade";
import IconButton from "./IconButton";
import Menu, { MenuItem } from "./Menu";
import AuthDialog from "./dialogs/AuthDialog";

import "./UserCenter.css";

class UserCenter extends React.Component {
  state = {
    menuOpen: false,
    menuAnchorPosition: null,
    authDialogOpen: false,
  };

  componentDidMount() {
    this.auth.load();
  }

  get auth() {
    return this.props.store.auth;
  }

  handleActionClick = event => {
    this.setState({
      menuOpen: true,
    });
  };

  handleMenuRequestClose = () => {
    this.setState({
      menuOpen: false,
    });
  };

  handleLogin = () => {
    this.setState({
      authDialogOpen: true,
    });
  };

  handleAuthDialogRequestClose = () => {
    this.setState({
      authDialogOpen: false,
    });
  };

  handleLogout = () => {
    this.handleMenuRequestClose();
    this.auth.logout();
  };

  render() {
    const t = this.props.t;
    const currentUser = this.auth.currentUser;
    return (
      <div>
        <TransitionGroup className="UserCenter">
          {this.auth.loaded &&
            (!currentUser ? (
              <Fade key="guest" appear exit={false}>
                <div>
                  <IconButton
                    className="UserCenter-action"
                    aria-label={t("Login")}
                    onClick={this.handleLogin}
                  >
                    <Person />
                  </IconButton>
                </div>
              </Fade>
            ) : (
              <Fade key="user" appear exit={false}>
                <div>
                  <IconButton
                    innerRef={node => (this.action = node)}
                    className="UserCenter-action"
                    aria-label={t("User Menu")}
                    aria-haspopup="true"
                    aria-owns="UserCenter-menu"
                    aria-expanded={this.state.menuOpen}
                    disabled={this.auth.state === "loading"}
                    onClick={this.handleActionClick}
                  >
                    <img
                      className="UserCenter-avatar"
                      src={link.avatar(currentUser)}
                      alt={t("User Avatar")}
                    />
                  </IconButton>

                  <Menu
                    id="UserCenter-menu"
                    target={() => this.action}
                    placement="bottom-end"
                    open={this.state.menuOpen}
                    onRequestClose={this.handleMenuRequestClose}
                  >
                    <MenuItem onClick={this.handleMenuRequestClose}>
                      {t("Profile")}
                    </MenuItem>
                    <MenuItem onClick={this.handleMenuRequestClose}>
                      {t("Publish Torrent")}
                    </MenuItem>
                    <MenuItem onClick={this.handleLogout}>
                      {t("Logout")}
                    </MenuItem>
                  </Menu>
                </div>
              </Fade>
            ))}

          {this.auth.state === "loading" && (
            <Fade key="loader" appear exit={false}>
              <div className="UserCenter-loader">
                <CircularProgress color="inherit" size={36} thickness={2} />
              </div>
            </Fade>
          )}
        </TransitionGroup>

        <AuthDialog
          open={this.state.authDialogOpen}
          onRequestClose={this.handleAuthDialogRequestClose}
        />
      </div>
    );
  }
}

export default translate()(inject("store")(observer(UserCenter)));
