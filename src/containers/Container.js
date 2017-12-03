import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { TransitionGroup } from "react-transition-group";

import Fade from "../views/transitions/Fade";
import LoaderContainer from "../views/LoaderContainer";
import ErrorState from "../views/ErrorState";

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

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  load(id) {
    const store = this.props.store;
    if (!store.has(id)) {
      store.load(id);
    }
  }

  render() {
    const { store, transition, children } = this.props;
    const loading = store.state === "loading";
    const id = loading ? this.state.prevId : this.props.id;
    const item = id !== null ? store.get(id) : null;
    return (
      <LoaderContainer loading={loading}>
        {store.state === "done" &&
          item &&
          (transition ? (
            <TransitionGroup>
              <Fade key={id} appear exit={false}>
                <div>{children(item, id)}</div>
              </Fade>
            </TransitionGroup>
          ) : (
            children(item, id)
          ))}
        {store.state === "error" && <ErrorState />}
      </LoaderContainer>
    );
  }
}

export default observer(Container);
