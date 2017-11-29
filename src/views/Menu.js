import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import Popover from "./Popover";
import List, { ListItem } from "./List";

import "./Menu.css";

const MenuTransition = props => (
  <CSSTransition classNames="Menu" timeout={250} {...props} />
);

class Menu extends React.Component {
  static propTypes = {
    target: PropTypes.func.isRequired,
    placement: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func,
  };
  static defaultProps = {
    placement: "bottom-start",
  };

  render() {
    const { className, children, ...props } = this.props;
    return (
      <Popover
        className={classNames("Menu", className)}
        transition={MenuTransition}
        {...props}
      >
        <List className="Menu-list">{children}</List>
      </Popover>
    );
  }
}

const MenuItem = ({ className, buttonClassName, ...props }) => (
  <ListItem
    className={classNames("Menu-item", className)}
    buttonClassName={classNames("Menu-button", buttonClassName)}
    {...props}
  />
);

export default Menu;
export { MenuItem };
