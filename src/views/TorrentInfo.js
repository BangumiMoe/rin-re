import React from "react";
import PropTypes from "prop-types";

import "./TorrentInfo.css";

class TorrentInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <article className="TorrentInfo">
        <h1 className="TorrentInfo-title">{item.title}</h1>
      </article>
    );
  }
}

export default TorrentInfo;
