import React from "react";
import PropTypes from "prop-types";

import RichText from "./RichText";

import "./TorrentInfo.css";

class TorrentInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <article className="TorrentInfo">
        <header className="TorrentInfo-header">
          <h1 className="TorrentInfo-title">{item.title}</h1>
        </header>
        <div className="TorrentInfo-introduction">
          <RichText html={item.introduction} />
        </div>
      </article>
    );
  }
}

export default TorrentInfo;
