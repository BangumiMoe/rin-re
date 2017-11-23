import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

import format from "date-fns/format";

import Person from "material-ui-icons/Person";
import Group from "material-ui-icons/Group";

import ButtonBase from "./ButtonBase";

import "./TorrentItem.css";

const MetaItem = ({ icon: Icon, name, children }) => (
  <p className="TorrentItem-meta" title={name}>
    {Icon && <Icon className="TorrentItem-metaIcon" />}
    <span className="TorrentItem-metaText">
      <span className="TorrentItem-metaName">{name}: </span>
      {children}
    </span>
  </p>
);

class TorrentItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { t, item } = this.props;
    return (
      <article>
        <ButtonBase
          component={Link}
          className="TorrentItem"
          to={`/torrent/${item.id}`}
        >
          <h1 className="TorrentItem-title">{item.title}</h1>
          <div className="TorrentItem-info">
            <MetaItem name={t("Publish Time")}>
              {format(item.publishTime, "YYYY-MM-DD")}
            </MetaItem>
            <MetaItem icon={Person} name={t("Publisher")}>
              {item.uploader.username}
            </MetaItem>
            {item.team && (
              <MetaItem icon={Group} name={t("Team")}>
                {item.team.name}
              </MetaItem>
            )}
          </div>
        </ButtonBase>
      </article>
    );
  }
}

export default translate()(TorrentItem);
