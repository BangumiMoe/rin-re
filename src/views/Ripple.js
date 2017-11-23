import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import { TransitionGroup, Transition } from "react-transition-group";

import "./Ripple.css";

class Ripple extends React.PureComponent {
  static propTypes = {
    center: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    center: false,
  };

  state = {
    items: [],
  };

  trigger(point = null) {
    this.press(point);
    this.release();
  }

  press(point = null) {
    let x, y, radius;

    const root = ReactDOM.findDOMNode(this);
    const rect = root.getBoundingClientRect();

    if (this.props.center || !point) {
      x = rect.width / 2;
      y = rect.height / 2;
    } else {
      x = point.x - rect.left;
      y = point.y - rect.top;
    }

    radius = Math.sqrt(
      Math.pow(Math.max(x, rect.width - x), 2) +
        Math.pow(Math.max(y, rect.height - y), 2),
    );
    radius = radius * 1.5;

    const item = { key: Date.now(), x, y, radius };
    this.setState({
      items: [...this.state.items, item],
    });
  }

  release() {
    this.setState({
      items: [],
    });
  }

  render() {
    return (
      <TransitionGroup component="span" className="Ripple">
        {this.state.items.map(({ key, x, y, radius }) => (
          <Transition key={key} enter={false} timeout={1000}>
            {status => (
              <span
                className={classNames("Ripple-item", {
                  "is-released": status === "exiting",
                })}
                style={{ left: x, top: y }}
              >
                <span
                  className="Ripple-ripple"
                  style={{ width: radius * 2, height: radius * 2 }}
                />
              </span>
            )}
          </Transition>
        ))}
      </TransitionGroup>
    );
  }
}

export default Ripple;
