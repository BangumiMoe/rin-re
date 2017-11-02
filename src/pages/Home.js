import React from "react";
import { inject } from "mobx-react";

import PaginatorContainer from "../containers/PaginatorContainer";
import TorrentList from "../views/TorrentList";

class Home extends React.Component {
  get paginator() {
    return this.props.store.torrentPaginator;
  }

  get page() {
    const params = new URLSearchParams(this.props.location.search);
    return Number(params.get("page")) || 1;
  }

  handlePageChange = page => {
    this.props.history.push(`?page=${page}`);
  };

  render() {
    return (
      <PaginatorContainer
        store={this.paginator}
        page={this.page}
        onPageChange={this.handlePageChange}
      >
        {torrents => <TorrentList list={torrents} />}
      </PaginatorContainer>
    );
  }
}

export default inject("store")(Home);
