import React from "react";
import PropTypes from "prop-types";

import { CircularProgress } from "material-ui";

import "./LoaderContainer.css";

class LoaderContainer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
  };
  static defaultProps = {
    loading: false,
  };

  render() {
    return (
      <div className="LoaderContainer">
        {this.props.children}
        {this.props.loading && (
          <div className="LoaderContainer-overlay">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default LoaderContainer;
