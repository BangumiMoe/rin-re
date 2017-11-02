import React from "react";

class TorrentInfo extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div>
        <h1>{item.title}</h1>
      </div>
    );
  }
}

export default TorrentInfo;
