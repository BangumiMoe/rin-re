import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./TorrentItem.css";

class TorrentItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <Link className="TorrentItem" to={`/torrents/${item.id}`}>
        <div className="TorrentItem-title">{item.title}</div>
      </Link>
    );
  }
}

export default TorrentItem;
