import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";

import ListIcon from "react-icons/lib/md/list";

import injectSearchParams from "../utils/injectSearchParams";

import RSSButton from "../views/RSSButton";
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
    this.props.history.push(`/?page=${page}`);
  };

  render() {
    const { t } = this.props;
    return (
      <div className="Home">
        <SectionTitle
          icon={ListIcon}
          title={t("Latest Torrents")}
          actions={<RSSButton />}
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
