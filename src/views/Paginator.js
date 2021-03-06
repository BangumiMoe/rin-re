import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import ChevronLeftIcon from "react-icons/lib/md/chevron-left";
import ChevronRightIcon from "react-icons/lib/md/chevron-right";

import IconButton from "./IconButton";

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
    const { t, value, pageCount } = this.props;
    return (
      <div className="Paginator">
        <IconButton
          className="Paginator-button"
          aria-label={t("Previous Page")}
          disabled={value === 1}
          onClick={this.handlePrev}
        >
          <ChevronLeftIcon />
        </IconButton>
        <div className="Paginator-text">
          {value} / {pageCount}
        </div>
        <IconButton
          className="Paginator-button"
          aria-label={t("Next Page")}
          disabled={value === pageCount}
          onClick={this.handleNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    );
  }
}

export default translate()(Paginator);
