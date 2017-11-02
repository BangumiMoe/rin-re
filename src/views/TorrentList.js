import React from "react";

import TorrentItem from "./TorrentItem";

class TorrentList extends React.Component {
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
