import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Person from "material-ui-icons/Person";
import Group from "material-ui-icons/Group";

import "./TorrentItem.css";

const MetaItem = ({ icon: Icon, children }) => (
  <div className="TorrentItem-meta">
    {Icon && <Icon className="TorrentItem-metaIcon" />}
    <div className="TorrentItem-metaText">{children}</div>
  </div>
);

class TorrentItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <Link className="TorrentItem" to={`/torrent/${item.id}`}>
        <div className="TorrentItem-title">{item.title}</div>
        <div className="TorrentItem-info">
          <MetaItem icon={Person}>{item.uploader.username}</MetaItem>
          {item.team && <MetaItem icon={Group}>{item.team.name}</MetaItem>}
        </div>
      </Link>
    );
  }
}

export default TorrentItem;
