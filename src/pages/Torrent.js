import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

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
    const t = this.props.t;
    return (
      <div className="Torrent">
        <Helmet title={t("Torrent")} />
        <Container store={this.torrents} id={this.id}>
          {torrent => <TorrentInfo item={torrent} />}
        </Container>
      </div>
    );
  }
}

export default translate()(inject("store")(Torrent));
