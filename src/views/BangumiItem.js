import React from "react";
import PropTypes from "prop-types";

import Translate from "./Translate";

class BangumiItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <article>
        <h1>
          <Translate value={item.tag.name} locales={item.tag.locale} />
        </h1>
      </article>
    );
  }
}

export default BangumiItem;
