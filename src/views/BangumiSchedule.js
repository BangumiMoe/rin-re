import React from "react";
import PropTypes from "prop-types";

import BangumiDay from "./BangumiDay";

import "./BangumiSchedule.css";

class BangumiSchedule extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
  };

  render() {
    const { list } = this.props;
    return (
      <div className="BangumiSchedule">
        <ul className="BangumiSchedule-layout">
          {[0, 1, 2, 3, 4, 5, 6].map(day => (
            <li key={day} className="BangumiSchedule-day">
              <BangumiDay
                day={day}
                list={list.filter(item => item.showOn === day)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BangumiSchedule;
