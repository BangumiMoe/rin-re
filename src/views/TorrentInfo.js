import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import DownloadIcon from "react-icons/lib/md/file-download";

import * as link from "../utils/link";

import RichText from "./RichText";
import Button from "./Button";
import FileTree from "./FileTree";
import TagList from "./TagList";
import TorrentMeta from "./TorrentMeta";

import "./TorrentInfo.css";

class TorrentInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { t, item } = this.props;
    return (
      <article className="TorrentInfo">
        <Helmet title={item.title} />
        <header className="TorrentInfo-header">
          <div className="TorrentInfo-headerMain">
            <div className="TorrentInfo-tags">
              <TagList list={[item.categoryTag]} />
              <span className="TorrentInfo-tagDivider" />
              <TagList
                list={item.tags.filter(tag => tag.id !== item.categoryTag.id)}
              />
            </div>
            <h1 className="TorrentInfo-title">{item.title}</h1>
            <div className="TorrentInfo-meta">
              <TorrentMeta item={item} />
            </div>
          </div>
          <div className="TorrentInfo-headerSide">
            <div className="TorrentInfo-downloads">
              <Button
                component="a"
                className="TorrentInfo-download"
                primary
                href={item.magnet}
              >
                <DownloadIcon className="TorrentInfo-downloadIcon" />
                {t("Magnet")}
              </Button>
              <Button
                component="a"
                className="TorrentInfo-download"
                raised
                primary
                href={link.download(item)}
              >
                <DownloadIcon className="TorrentInfo-downloadIcon" />
                {t("Torrent")}
              </Button>
            </div>
          </div>
        </header>
        <div className="TorrentInfo-content">
          <FileTree content={item.content} />
        </div>
        <div className="TorrentInfo-introduction">
          <RichText html={item.introduction} />
        </div>
      </article>
    );
  }
}

export default translate()(TorrentInfo);
