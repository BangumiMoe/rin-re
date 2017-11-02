import React from "react";
import PropTypes from "prop-types";

class TorrentInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

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
