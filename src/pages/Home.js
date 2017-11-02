import React from "react";
import { inject } from "mobx-react";

import Container from "../containers/Container";
import TorrentList from "../views/TorrentList";
import Paginator from "../views/Paginator";

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
      <Container store={this.paginator} id={this.page}>
        {(torrents, page) => (
          <div>
            <TorrentList list={torrents} />
            <Paginator
              value={page}
              pageCount={this.paginator.pageCount}
              onChange={this.handlePageChange}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default inject("store")(Home);
