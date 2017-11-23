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
    return (
      <div
        className="RichText"
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
}

export default RichText;
