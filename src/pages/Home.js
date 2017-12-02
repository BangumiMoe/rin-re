import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";

import ListIcon from "react-icons/lib/md/list";
import RSSFeedIcon from "react-icons/lib/md/rss-feed";

import IconButton from "../views/IconButton";
import SectionTitle from "../views/SectionTitle";
import TorrentList from "../views/TorrentList";

import PaginatorContainer from "../containers/PaginatorContainer";

class Home extends React.Component {
  get paginator() {
    return this.props.store.torrentPaginator;
  }

  get page() {
    const params = new URLSearchParams(this.props.location.search);
    return Number(params.get("page")) || 1;
  }

  handlePageChange = page => {
    this.props.history.push(`?page=${page}`);
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
              className="Home-action"
              target="_blank"
              href="https://bangumi.moe/rss/latest"
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

export default translate()(inject("store")(Home));
