import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Translate from "./Translate";
import ButtonBase from "./ButtonBase";

import "./TagItem.css";

class TagItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <ButtonBase component={Link} className="TagItem" to={`/tag/${item.id}`}>
        <Translate value={item.name} locales={item.locale} />
      </ButtonBase>
    );
  }
}

export default TagItem;
