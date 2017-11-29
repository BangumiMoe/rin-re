import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { Modal } from "react-overlays";

import "./Dialog.css";

const DialogTransition = props => (
  <CSSTransition classNames="Dialog" timeout={250} {...props} />
);

class Dialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
  };
  static defaultProps = {
    open: false,
  };

  render() {
    const { className, open, onRequestClose, children, ...props } = this.props;
    return (
      <Modal
        className="Dialog"
        backdropClassName="Dialog-backdrop"
        transition={DialogTransition}
        backdropTransition={DialogTransition}
        show={open}
        onBackdropClick={onRequestClose}
        onEscapeKeyDown={onRequestClose}
        {...props}
      >
        <article className={classNames("Dialog-dialog", className)}>
          {children}
        </article>
      </Modal>
    );
  }
}

const DialogTitle = ({ children }) => (
  <header className="Dialog-header">
    <h1 className="Dialog-title">{children}</h1>
  </header>
);

const DialogContent = ({ children }) => (
  <div className="Dialog-content">{children}</div>
);

const DialogActions = ({ children }) => (
  <div className="Dialog-actions">
    <div className="Dialog-actionsLayout">{children}</div>
  </div>
);

export default Dialog;
export { DialogTitle, DialogContent, DialogActions };
