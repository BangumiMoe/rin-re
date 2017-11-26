import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ButtonBase from "./ButtonBase";
import TorrentMeta from "./TorrentMeta";

import "./TorrentItem.css";

class TorrentItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <article>
        <ButtonBase
          component={Link}
          className="TorrentItem"
          to={`/torrent/${item.id}`}
        >
          <h1 className="TorrentItem-title">{item.title}</h1>
          <div className="TorrentItem-meta">
            <TorrentMeta item={item} />
          </div>
        </ButtonBase>
      </article>
    );
  }
}

export default TorrentItem;
