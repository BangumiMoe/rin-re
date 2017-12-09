import React from "react";
import PropTypes from "prop-types";

import BangumiDay from "./BangumiDay";

class BangumiSchedule extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
  };

  render() {
    const { list } = this.props;
    return (
      <div>
        {[0, 1, 2, 3, 4, 5, 6].map(day => (
          <BangumiDay
            key={day}
            day={day}
            list={list.filter(item => item.showOn === day)}
          />
        ))}
      </div>
    );
  }
}

export default BangumiSchedule;
