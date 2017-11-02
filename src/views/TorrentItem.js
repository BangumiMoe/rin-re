import React from "react";
import { Link } from "react-router-dom";

class TorrentItem extends React.Component {
  render() {
    const item = this.props.item;
    return <Link to={`/torrents/${item.id}`}>{item.title}</Link>;
  }
}

export default TorrentItem;
