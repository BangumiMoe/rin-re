import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ButtonBase from "./ButtonBase";

import "./Button.css";

class Button extends React.Component {
  static propTypes = {
    raised: PropTypes.bool.isRequired,
    primary: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    raised: false,
    primary: false,
  };

  render() {
    const { className, raised, primary, ...props } = this.props;
    return (
      <ButtonBase
        className={classNames(
          "Button",
          { "Button--raised": raised, "Button--primary": primary },
          className,
        )}
        {...props}
      />
    );
  }
}

export default Button;
