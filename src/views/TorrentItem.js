import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TorrentItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return <Link to={`/torrents/${item.id}`}>{item.title}</Link>;
  }
}

export default TorrentItem;
