import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";

import SearchIcon from "react-icons/lib/md/search";
import RSSFeedIcon from "react-icons/lib/md/rss-feed";

import * as link from "../utils/link";
import injectSearchParams from "../utils/injectSearchParams";

import IconButton from "../views/IconButton";
import SectionTitle from "../views/SectionTitle";
import SearchEditor from "../views/SearchEditor";
import TorrentList from "../views/TorrentList";

import SearchContainer from "../containers/SearchContainer";

class Search extends React.Component {
  get paginator() {
    return this.props.store.searchPaginator;
  }

  get query() {
    return this.props.searchParams.get("query") || "";
  }

  get page() {
    return Number(this.props.searchParams.get("page")) || 1;
  }

  handleSubmit = query => {
    if (query) {
      this.props.history.push(
        "/search?" +
          new URLSearchParams({
            query,
          }).toString(),
      );
    } else {
      this.props.history.push("/search");
    }
  };

  handlePageChange = page => {
    this.props.history.push(
      "/search?" +
        new URLSearchParams({
          query: this.query,
          page,
        }).toString(),
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div className="Search">
        <SearchEditor
          key={this.query}
          autoFocus={!this.query}
          defaultValue={this.query}
          onSubmit={this.handleSubmit}
        />
        {this.query && (
          <React.Fragment>
            <SectionTitle
              icon={SearchIcon}
              title={t("Search Results")}
              actions={
                <IconButton
                  component="a"
                  target="_blank"
                  href={link.searchRSS(this.query)}
                  aria-label={t("RSS Feed")}
                >
                  <RSSFeedIcon />
                </IconButton>
              }
            />
            <SearchContainer
              store={this.paginator}
              query={this.query}
              page={this.page}
              onPageChange={this.handlePageChange}
            >
              {torrents => <TorrentList list={torrents} />}
            </SearchContainer>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default translate()(injectSearchParams(inject("store")(Search)));
