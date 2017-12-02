import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";

import ListIcon from "react-icons/lib/md/list";
import RSSFeedIcon from "react-icons/lib/md/rss-feed";

import * as link from "../utils/link";
import injectSearchParams from "../utils/injectSearchParams";

import IconButton from "../views/IconButton";
import SectionTitle from "../views/SectionTitle";
import TorrentList from "../views/TorrentList";

import PaginatorContainer from "../containers/PaginatorContainer";

class Home extends React.Component {
  get paginator() {
    return this.props.store.torrentPaginator;
  }

  get page() {
    return Number(this.props.searchParams.get("page")) || 1;
  }

  handlePageChange = page => {
    this.props.history.push(
      "/?" +
        new URLSearchParams({
          page,
        }).toString(),
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div className="Home">
        <SectionTitle
          icon={ListIcon}
          title={t("Latest Torrents")}
          actions={
            <IconButton
              component="a"
              target="_blank"
              href={link.rss()}
              aria-label={t("RSS Feed")}
            >
              <RSSFeedIcon />
            </IconButton>
          }
        />
        <PaginatorContainer
          store={this.paginator}
          page={this.page}
          onPageChange={this.handlePageChange}
        >
          {torrents => <TorrentList list={torrents} />}
        </PaginatorContainer>
      </div>
    );
  }
}

export default translate()(injectSearchParams(inject("store")(Home)));
