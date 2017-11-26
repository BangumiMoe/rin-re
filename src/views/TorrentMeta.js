import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import format from "date-fns/format";

import Person from "react-icons/lib/md/person";
import Group from "react-icons/lib/md/group";

import "./TorrentMeta.css";

const Item = ({ icon: Icon, name, children }) => (
  <p className="TorrentMeta-item" title={name}>
    {Icon && <Icon className="TorrentMeta-icon" />}
    <span className="TorrentMeta-text">
      <span className="TorrentMeta-name">{name}: </span>
      {children}
    </span>
  </p>
);

class TorrentMeta extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { t, item } = this.props;
    return (
      <div className="TorrentMeta">
        <div className="TorrentMeta-layout">
          <Item name={t("Publish Time")}>
            {format(item.publishTime, "YYYY-MM-DD")}
          </Item>
          <Item icon={Person} name={t("Publisher")}>
            {item.uploader.username}
          </Item>
          {item.team && (
            <Item icon={Group} name={t("Team")}>
              {item.team.name}
            </Item>
          )}
        </div>
      </div>
    );
  }
}

export default translate()(TorrentMeta);
