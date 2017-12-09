import React from "react";
import PropTypes from "prop-types";

import BangumiItem from "./BangumiItem";

class BangumiDay extends React.Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    list: PropTypes.array.isRequired,
  };

  render() {
    const { day, list } = this.props;
    return (
      <section>
        <h3>{day}</h3>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <BangumiItem item={item} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default BangumiDay;
