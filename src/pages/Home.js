import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

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
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <Link to={`/torrents/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default inject("store")(observer(Home));
