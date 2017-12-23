import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import PaginatorContainer from "./PaginatorContainer";

class SearchPaginator extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    data: PropTypes.any,
    transition: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    transition: true,
  };

  componentWillMount() {
    const { store, query } = this.props;
    if (!store.has(query)) {
      store.create(query);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { store, query } = this.props;
    const { query: nextQuery } = nextProps;
    if (query !== nextQuery && !store.has(nextQuery)) {
      store.create(nextQuery);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.query !== nextProps.query ||
      this.props.page !== nextProps.page ||
      this.props.data !== nextProps.data
    );
  }

  render() {
    const { store, query, ...props } = this.props;
    return (
      <PaginatorContainer key={query} store={store.get(query)} {...props} />
    );
  }
}

export default observer(SearchPaginator);
