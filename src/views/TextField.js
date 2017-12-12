import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import InputBase from "./InputBase";

import "./TextField.css";

class TextField extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  };

  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { id, label, helperText, disabled, error, ...props } = this.props;
    return (
      <span
        className={classNames("TextField", {
          "is-disabled": disabled,
          "is-error": error,
          "is-focused": this.state.focused,
        })}
      >
        {label && (
          <label className="TextField-label" htmlFor={id}>
            {label}
          </label>
        )}
        <span className="TextField-content">
          <InputBase
            className="TextField-input"
            id={id}
            disabled={disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...props}
          />
        </span>
        {helperText && (
          <span className="TextField-helperText">{helperText}</span>
        )}
      </span>
    );
  }
}

export default TextField;
