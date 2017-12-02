import React from "react";
import { inject } from "mobx-react";

import List from "react-icons/lib/md/list";
import RSSFeed from "react-icons/lib/md/rss-feed";

import IconButton from "../views/IconButton";
import TorrentList from "../views/TorrentList";

import PaginatorContainer from "../containers/PaginatorContainer";

import "./Home.css";

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
    return (
      <div className="Home">
        <div className="Home-header">
          <h2 className="Home-title">
            <List className="Home-titleIcon" />
            <span className="Home-titleText">Latest Torrents</span>
          </h2>
          <IconButton
            component="a"
            className="Home-action"
            target="_blank"
            href="https://bangumi.moe/rss/latest"
          >
            <RSSFeed />
          </IconButton>
        </div>
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

export default inject("store")(Home);
