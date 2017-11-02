import React from "react";
import { inject } from "mobx-react";

import Container from "../containers/Container";
import TorrentInfo from "../views/TorrentInfo";

class Torrent extends React.Component {
  get torrents() {
    return this.props.store.torrents;
  }

  get id() {
    return this.props.match.params.id;
  }

  render() {
    return (
      <Container store={this.torrents} id={this.id}>
        {torrent => <TorrentInfo item={torrent} />}
      </Container>
    );
  }
}

export default inject("store")(Torrent);
