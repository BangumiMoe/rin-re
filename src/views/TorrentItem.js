import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Translate from "./Translate";
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
          <div className="TorrentItem-category">
            <Translate
              value={item.categoryTag.name}
              locales={item.categoryTag.locale}
            />
          </div>
          <div className="TorrentItem-content">
            <h1 className="TorrentItem-title">{item.title}</h1>
            <div className="TorrentItem-meta">
              <TorrentMeta item={item} />
            </div>
          </div>
        </ButtonBase>
      </article>
    );
  }
}

export default TorrentItem;
