import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Container from "./Container";
import Paginator from "../views/Paginator";

class PaginatorContainer extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  renderPaginator(page) {
    const store = this.props.store;
    return (
      <Paginator
        value={page}
        pageCount={store.pageCount}
        onChange={this.props.onChange}
      />
    );
  }

  render() {
    const store = this.props.store;
    return (
      <Container store={store} id={this.props.page}>
        {(list, page) => (
          <div>
            {this.renderPaginator(page)}
            {this.props.children(list, page)}
            {this.renderPaginator(page)}
          </div>
        )}
      </Container>
    );
  }
}

export default observer(PaginatorContainer);
