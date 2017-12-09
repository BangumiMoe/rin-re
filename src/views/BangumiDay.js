import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import BangumiItem from "./BangumiItem";

import "./BangumiDay.css";

class BangumiDay extends React.Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    list: PropTypes.array.isRequired,
  };

  render() {
    const { t, day, list } = this.props;
    return (
      <section className="BangumiDay">
        <h3 className="BangumiDay-title">{t(`Weekday ${day}`)}</h3>
        <div className="BangumiDay-content">
          <ul className="BangumiDay-list">
            {list.map(item => (
              <li key={item.id} className="BangumiDay-item">
                <BangumiItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default translate()(BangumiDay);
