import React from "react";
import PropTypes from "prop-types";

import TorrentItem from "./TorrentItem";

import "./TorrentList.css";

class TorrentList extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
  };

  render() {
    const list = this.props.list;
    return (
      <ul className="TorrentList">
        {list.map(item => (
          <li key={item.id} className="TorrentList-item">
            <TorrentItem item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default TorrentList;
