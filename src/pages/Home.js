import React from "react";
import { inject } from "mobx-react";

import PaginatorContainer from "../containers/PaginatorContainer";
import TorrentList from "../views/TorrentList";

class Home extends React.Component {
  get paginator() {
    return this.props.store.torrentPaginator;
  }

  get page() {
    return 1;
  }

  render() {
    return (
      <PaginatorContainer store={this.paginator} page={this.page}>
        {torrents => <TorrentList list={torrents} />}
      </PaginatorContainer>
    );
  }
}

export default inject("store")(Home);
