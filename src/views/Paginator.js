import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "material-ui";
import { ChevronLeft, ChevronRight } from "material-ui-icons";

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
        <div className="Paginator-buttons">
          <IconButton disabled={value === 1} onClick={this.handlePrev}>
            <ChevronLeft />
          </IconButton>
          <IconButton disabled={value === pageCount} onClick={this.handleNext}>
            <ChevronRight />
          </IconButton>
        </div>
        <div className="Paginator-text">
          {this.props.value} / {this.props.pageCount}
        </div>
      </div>
    );
  }
}

export default Paginator;
