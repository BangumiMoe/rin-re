import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./InputBase.css";

class InputBase extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    type: PropTypes.string.isRequired,
  };
  static defaultProps = {
    component: "input",
    type: "text",
  };

  render() {
    const { component: Component, className, ...props } = this.props;
    return (
      <Component className={classNames("InputBase", className)} {...props} />
    );
  }
}

export default InputBase;
