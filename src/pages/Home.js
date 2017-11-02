import React from "react";
import { inject, observer } from "mobx-react";

import TorrentList from "../views/TorrentList";

class Home extends React.Component {
  componentDidMount() {
    this.load(this.pageNumber);
  }

  get pageNumber() {
    return 1;
  }

  get paginator() {
    return this.props.store.torrentPaginator;
  }

  load(page) {
    if (!this.paginator.hasPage(page)) {
      this.paginator.loadPage(page);
    }
  }

  render() {
    const list = this.paginator.getPage(this.pageNumber);
    if (!list) return null;
    return (
      <div>
        <div>1 of {this.paginator.pageSize}</div>
        <TorrentList list={list} />
      </div>
    );
  }
}

export default inject("store")(observer(Home));
