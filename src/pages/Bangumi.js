import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import ListIcon from "react-icons/lib/md/list";

import injectSearchParams from "../utils/injectSearchParams";

import RSSButton from "../views/RSSButton";
import SectionTitle from "../views/SectionTitle";
import TorrentList from "../views/TorrentList";
import BangumiInfo from "../views/BangumiInfo";

import Container from "../containers/Container";
import SearchContainer from "../containers/SearchContainer";

class Bangumi extends React.Component {
  get bangumis() {
    return this.props.store.bangumis;
  }

  get id() {
    return this.props.match.params.id;
  }

  get paginator() {
    return this.props.store.searchPaginator;
  }

  get page() {
    return Number(this.props.searchParams.get("page")) || 1;
  }

  handlePageChange = page => {
    this.props.history.push(`/bangumi/${this.id}?page=${page}`);
  };

  render() {
    const { t } = this.props;
    return (
      <div className="Bangumi">
        <Helmet title={t("Bangumi")} />

        <Container store={this.bangumis} id={this.id} data={this.page}>
          {bangumi => (
            <div>
              <BangumiInfo item={bangumi} />

              <SectionTitle
                icon={ListIcon}
                title={t("Latest Torrents")}
                actions={<RSSButton query={"`" + bangumi.tag.id + "`"} />}
              />
              <SearchContainer
                store={this.paginator}
                query={"`" + bangumi.tag.id + "`"}
                page={this.page}
                onPageChange={this.handlePageChange}
              >
                {torrents => <TorrentList list={torrents} />}
              </SearchContainer>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default translate()(injectSearchParams(inject("store")(Bangumi)));
