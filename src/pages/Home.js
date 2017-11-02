import React from "react";
import { inject, observer } from "mobx-react";

import TorrentList from "../views/TorrentList";

class Home extends React.Component {
  state = {
    currentPage: 0,
  };

  componentDidMount() {
    this.load(1);
  }

  componentWillUnmount() {
    this.abort();
  }

  get paginator() {
    return this.props.store.torrentPaginator;
  }

  load(page) {
    if (this.paginator.has(page)) {
      this.setState({
        currentPage: page,
      });
      return;
    }
    this.paginator.load(page).then(() => {
      this.setState({
        currentPage: page,
      });
    });
  }

  abort() {
    this.paginator.abort();
  }

  render() {
    const list = this.paginator.get(this.state.currentPage);
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
