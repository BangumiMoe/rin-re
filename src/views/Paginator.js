import React from "react";
import PropTypes from "prop-types";

class Paginator extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  render() {
    return (
      <div>
        {this.props.value} of {this.props.pageCount}
      </div>
    );
  }
}

export default Paginator;
