import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as link from "../utils/link";

import Translate from "./Translate";
import ButtonBase from "./ButtonBase";

import "./BangumiItem.css";

class BangumiItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <article>
        <ButtonBase
          component={Link}
          className="BangumiItem"
          to={
            "/search?" +
            new URLSearchParams({
              query: `\`${item.tag.id}\``,
            }).toString()
          }
        >
          <img className="BangumiItem-cover" src={link.bangumiIcon(item)} />
          <div className="BangumiItem-content">
            <h1 className="BangumiItem-title">
              <Translate value={item.tag.name} locales={item.tag.locale} />
            </h1>
            <p className="BangumiItem-credit">{item.credit}</p>
          </div>
        </ButtonBase>
      </article>
    );
  }
}

export default BangumiItem;
