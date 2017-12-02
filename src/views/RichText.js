import React from "react";
import PropTypes from "prop-types";

import "./RichText.css";

class RichText extends React.Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
  };
  static defaultProps = {
    html: "",
  };

  render() {
    const { html } = this.props;
    return (
      <div className="RichText" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}

export default RichText;
