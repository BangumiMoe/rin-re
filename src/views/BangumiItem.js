import React from "react";
import PropTypes from "prop-types";

class BangumiItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <article>
        <h1>{item.name}</h1>
      </article>
    );
  }
}

export default BangumiItem;
