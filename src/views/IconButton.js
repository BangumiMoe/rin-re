import React from "react";
import classNames from "classnames";

import ButtonBase from "./ButtonBase";

import "./IconButton.css";

class IconButton extends React.Component {
  render() {
    const { ripple, className, ...props } = this.props;
    return (
      <ButtonBase
        ripple={{ ...ripple, center: true }}
        className={classNames("IconButton", className)}
        {...props}
      />
    );
  }
}

export default IconButton;
