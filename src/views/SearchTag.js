import React from "react";
import PropTypes from "prop-types";

import "./SearchTag.css";

class SearchTag extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  handleMouseDown = event => {
    event.preventDefault();
  };

  render() {
    return (
      <span className="SearchTag" onMouseDown={this.handleMouseDown}>
        tag
      </span>
    );
  }
}

export default SearchTag;
