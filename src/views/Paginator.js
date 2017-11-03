import React from "react";
import PropTypes from "prop-types";

import Button from "material-ui/Button";
import ChevronLeft from "material-ui-icons/ChevronLeft";
import ChevronRight from "material-ui-icons/ChevronRight";

import "./Paginator.css";

class Paginator extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  handlePrev = () => {
    const { value, onChange } = this.props;
    if (onChange) onChange(value - 1);
  };

  handleNext = () => {
    const { value, onChange } = this.props;
    if (onChange) onChange(value + 1);
  };

  render() {
    const { value, pageCount } = this.props;
    return (
      <div className="Paginator">
        <Button
          className="Paginator-button"
          disabled={value === 1}
          aria-label="Newer"
          onClick={this.handlePrev}
        >
          <ChevronLeft />
        </Button>
        <div className="Paginator-text">
          {this.props.value} / {this.props.pageCount}
        </div>
        <Button
          className="Paginator-button"
          disabled={value === pageCount}
          aria-label="Older"
          onClick={this.handleNext}
        >
          <ChevronRight />
        </Button>
      </div>
    );
  }
}

export default Paginator;
