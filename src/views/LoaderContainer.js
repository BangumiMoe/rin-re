import React from "react";
import PropTypes from "prop-types";

import Loader from "./Loader";

import "./LoaderContainer.css";

class LoaderContainer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
  };
  static defaultProps = {
    loading: false,
  };

  render() {
    const { loading, children } = this.props;
    return (
      <div className="LoaderContainer">
        {children}
        {loading && (
          <div className="LoaderContainer-overlay">
            <div className="LoaderContainer-loader">
              <Loader />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoaderContainer;
