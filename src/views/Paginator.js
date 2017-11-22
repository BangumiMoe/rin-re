import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import IconButton from "material-ui/IconButton";
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
    const { t, value, pageCount } = this.props;
    return (
      <div className="Paginator">
        <IconButton
          className="Paginator-button"
          aria-label={t("Previous Page")}
          disabled={value === 1}
          onClick={this.handlePrev}
        >
          <ChevronLeft />
        </IconButton>
        <div className="Paginator-text">
          {this.props.value} / {this.props.pageCount}
        </div>
        <IconButton
          className="Paginator-button"
          aria-label={t("Next Page")}
          disabled={value === pageCount}
          onClick={this.handleNext}
        >
          <ChevronRight />
        </IconButton>
      </div>
    );
  }
}

export default translate()(Paginator);
