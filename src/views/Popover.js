import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "react-overlays";

import Position from "./Position";

import "./Popover.css";

class Popover extends React.Component {
  static propTypes = {
    target: PropTypes.func.isRequired,
    placement: PropTypes.string.isRequired,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    onRequestClose: PropTypes.func,
  };
  static defaultProps = {
    placement: "auto",
    offset: 0,
  };

  render() {
    const {
      className,
      open,
      target,
      placement,
      offset,
      onRequestClose,
      children,
      ...props
    } = this.props;
    return (
      <Modal
        className="Popover"
        backdropClassName="Popover-backdrop"
        show={open}
        onBackdropClick={onRequestClose}
        onEscapeKeyDown={onRequestClose}
        {...props}
      >
        <Position
          className={classNames("Popover-popover", className)}
          target={target}
          fixed
          placement={placement}
          offset={offset}
        >
          {children}
        </Position>
      </Modal>
    );
  }
}

export default Popover;
