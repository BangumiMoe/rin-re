import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import RichText from "./RichText";
import FileTree from "./FileTree";

import "./TorrentInfo.css";

class TorrentInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <article className="TorrentInfo">
        <Helmet title={item.title} />
        <header className="TorrentInfo-header">
          <h1 className="TorrentInfo-title">{item.title}</h1>
        </header>
        <div className="TorrentInfo-content">
          <FileTree content={item.content} />
        </div>
        <div className="TorrentInfo-introduction">
          <RichText html={item.introduction} />
        </div>
      </article>
    );
  }
}

export default TorrentInfo;
