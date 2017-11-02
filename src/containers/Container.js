import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { TransitionGroup } from "react-transition-group";

import Fade from "../views/transitions/Fade";
import LoaderContainer from "../views/LoaderContainer";

class Container extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    transition: PropTypes.bool,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    transition: true,
  };

  state = {
    prevId: null,
  };

  componentDidMount() {
    this.load(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ prevId: this.props.id });
      this.load(nextProps.id);
    }
  }

  load(id) {
    const store = this.props.store;
    if (!store.has(id)) {
      store.load(id);
    }
  }

  render() {
    const store = this.props.store;
    const loading = store.state === "loading";
    const id = loading ? this.state.prevId : this.props.id;
    const item = id !== null ? store.get(id) : null;
    return (
      <LoaderContainer loading={loading}>
        {item &&
          (this.props.transition ? (
            <TransitionGroup>
              <Fade key={id} appear exit={false}>
                {this.props.children(item, id)}
              </Fade>
            </TransitionGroup>
          ) : (
            this.props.children(item, id)
          ))}
      </LoaderContainer>
    );
  }
}

export default observer(Container);
