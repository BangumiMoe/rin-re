import React from "react";
import { inject, observer } from "mobx-react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import SearchIcon from "react-icons/lib/md/search";

import injectSearchParams from "../utils/injectSearchParams";

import RSSButton from "../views/RSSButton";
import SectionTitle from "../views/SectionTitle";
import SearchBar from "../views/SearchBar";
import TorrentList from "../views/TorrentList";

import SearchContainer from "../containers/SearchContainer";

class Search extends React.Component {
  get search() {
    return this.props.store.search;
  }

  get query() {
    return this.props.searchParams.get("query") || "";
  }

  get page() {
    return Number(this.props.searchParams.get("page")) || 1;
  }

  handleSubmit = query => {
    if (query) {
      this.props.history.push(`/search?query=${encodeURIComponent(query)}`);
    } else {
      this.props.history.push("/search");
    }
  };

  handlePageChange = page => {
    this.props.history.push(
      `/search?query=${encodeURIComponent(this.query)}&page=${page}`,
    );
  };

  render() {
    const { t } = this.props;
    const paginator = this.search.get(this.query);
    return (
      <div className="Search">
        <Helmet title={t("Search")} />

        <SearchBar
          key={this.query}
          autoFocus={!this.query}
          defaultValue={this.query}
          onSubmit={this.handleSubmit}
        />

        {this.query && (
          <React.Fragment>
            <SectionTitle
              icon={SearchIcon}
              title={
                t("Search Results") +
                (paginator && paginator.count ? ` (${paginator.count})` : "")
              }
              actions={<RSSButton query={this.query} />}
            />
            <SearchContainer
              store={this.search}
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

export default translate()(
  injectSearchParams(inject("store")(observer(Search))),
);
