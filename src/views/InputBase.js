import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./InputBase.css";

class InputBase extends React.Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
    type: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    component: "input",
    type: "text",
    autoFocus: false,
  };

  componentDidMount() {
    if (this.props.autoFocus && this.root && this.root.focus) {
      this.root.focus();
    }
  }

  render() {
    const { innerRef, component: Component, className, ...props } = this.props;
    return (
      <Component
        ref={node => {
          this.root = node;
          if (innerRef) {
            innerRef(node);
          }
        }}
        className={classNames("InputBase", className)}
        {...props}
      />
    );
  }
}

export default InputBase;
