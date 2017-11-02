import React from "react";
import PropTypes from "prop-types";

import TorrentItem from "./TorrentItem";

class TorrentList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const list = this.props.list;
    return (
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <TorrentItem item={item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default TorrentList;
