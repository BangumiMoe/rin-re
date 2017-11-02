import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import LoaderContainer from "./views/LoaderContainer";

class Container extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  state = {
    currentId: null,
  };

  mounted = true;

  componentDidMount() {
    this.load(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.load(nextProps.id);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  load(id) {
    const store = this.props.store;
    if (store.has(id)) {
      this.setState({
        currentId: id,
      });
      return;
    }
    store.load(id).then(() => {
      if (this.mounted) {
        this.setState({
          currentId: id,
        });
      }
    });
  }

  render() {
    const store = this.props.store;
    const id = this.state.currentId;
    const item = id !== null ? store.get(id) : null;
    return (
      <LoaderContainer loading={store.state === "loading"}>
        {item && this.props.children(item, id)}
      </LoaderContainer>
    );
  }
}

export default observer(Container);
