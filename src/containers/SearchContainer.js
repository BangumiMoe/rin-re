import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import PaginatorContainer from "./PaginatorContainer";

class SearchPaginator extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    transition: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    transition: true,
  };

  componentDidMount() {
    const { store, query } = this.props;
    store.setQuery(query);
  }

  componentWillUnmount() {
    const { store } = this.props;
    store.setQuery("");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.props.store.setQuery(nextProps.query);
    }
  }

  render() {
    const { store, query, ...props } = this.props;
    return (
      store.query &&
      query && <PaginatorContainer key={query} store={store} {...props} />
    );
  }
}

export default observer(SearchPaginator);
