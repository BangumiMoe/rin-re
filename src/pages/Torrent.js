import React from "react";
import { inject, observer } from "mobx-react";

class Torrent extends React.Component {
  componentDidMount() {
    this.load(this.id);
  }

  get id() {
    return this.props.match.params.id;
  }

  get torrents() {
    return this.props.store.torrents;
  }

  load(id) {
    if (!this.torrents.has(id)) {
      this.torrents.load(id);
    }
  }

  render() {
    const torrent = this.torrents.get(this.id);
    if (!torrent) return null;
    return <div>{torrent.title}</div>;
  }
}

export default inject("store")(observer(Torrent));
