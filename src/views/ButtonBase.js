import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import Ripple from "./Ripple";

import "./ButtonBase.css";

const PRESS_EVENTS = ["pointerdown"];
const RELEASE_EVENTS = ["pointerup", "pointerleave", "pointercancel"];

class ButtonBase extends React.Component {
  static propTypes = {};
  static defaultProps = {
    component: "span",
  };

  componentDidMount() {
    const root = ReactDOM.findDOMNode(this);
    PRESS_EVENTS.forEach(event =>
      root.addEventListener(event, this.handlePress, { passive: true }),
    );
    RELEASE_EVENTS.forEach(event =>
      root.addEventListener(event, this.handleRelease, { passive: true }),
    );
  }

  componentWillUnmount() {
    const root = ReactDOM.findDOMNode(this);
    PRESS_EVENTS.forEach(event =>
      root.removeEventListener(event, this.handlePress, { passive: true }),
    );
    RELEASE_EVENTS.forEach(event =>
      root.removeEventListener(event, this.handleRelease, { passive: true }),
    );
  }

  handlePress = event => {
    if (event.buttons === 1) {
      this.ripple.press({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  handleRelease = () => {
    this.ripple.release();
  };

  render() {
    const {
      ripple,
      component: Component,
      className,
      children,
      ...props
    } = this.props;
    return (
      <Component className={classNames("ButtonBase", className)} {...props}>
        {children}
        <Ripple ref={node => (this.ripple = node)} {...ripple} />
      </Component>
    );
  }
}

export default ButtonBase;
