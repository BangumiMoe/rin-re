import React from "react";
import PropTypes from "prop-types";

import TagItem from "./TagItem";

import "./TagList.css";

class TagList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    return (
      <div className="TagList">
        <ul className="TagList-list">
          {this.props.list.map(item => (
            <li key={item.id} className="TagList-item">
              <TagItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TagList;
