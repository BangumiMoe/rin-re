import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Translate from "./Translate";
import ButtonBase from "./ButtonBase";

import "./TagItem.css";

class TagItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    link: PropTypes.string,
  };

  render() {
    const { item, link } = this.props;
    return (
      <ButtonBase
        component={Link}
        className="TagItem"
        to={link || `/tag/${item.id}`}
      >
        <Translate value={item.name} locales={item.locale} />
      </ButtonBase>
    );
  }
}

export default TagItem;
