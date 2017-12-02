import React from "react";
import PropTypes from "prop-types";

import "./SectionTitle.css";

class SectionTitle extends React.Component {
  static propTypes = {
    icon: PropTypes.func,
    title: PropTypes.string.isRequired,
    actions: PropTypes.node,
  };
  static defaultProps = {
    title: "",
  };

  render() {
    const { icon: Icon, title, actions } = this.props;
    return (
      <div className="SectionTitle">
        {Icon && <Icon className="SectionTitle-icon" />}
        <h2 className="SectionTitle-title">{title}</h2>
        {actions && <div className="SectionTitle-actions">{actions}</div>}
      </div>
    );
  }
}

export default SectionTitle;
