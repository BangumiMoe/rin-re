import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

import Popper from "popper.js";

class Position extends React.Component {
  static propTypes = {
    target: PropTypes.func.isRequired,
    placement: PropTypes.string.isRequired,
    fixed: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    placement: "auto",
    fixed: false,
  };

  state = {
    data: null,
  };

  componentDidMount() {
    const { target, placement, fixed } = this.props;
    this.popper = new Popper(target(), this.root, {
      placement: placement,
      positionFixed: fixed,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        setState: {
          order: 900,
          enabled: true,
          fn: data => {
            console.log(data);
            this.setState({ data });
            return data;
          },
        },
      },
      onUpdate: data => {
        console.log(data);
      },
    });
  }

  componentWillUnmount() {
    this.popper.destroy();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.children !== nextProps.children) return true;
    if (!this.state.data || !nextState.data) return true;
    return !isEqual(
      this.state.data.offsets.popper,
      nextState.data.offsets.popper,
    );
  }

  render() {
    const { target, placement, fixed, ...props } = this.props;
    const data = this.state.data;
    return (
      <div
        ref={node => (this.root = node)}
        style={
          !data
            ? {
                position: "fixed",
                left: 0,
                top: 0,
                visibility: "hiden",
                opacity: 0,
              }
            : data.styles
        }
        {...props}
      />
    );
  }
}

export default Position;
