import React from "react";
import PropTypes from "prop-types";

import { TransitionGroup } from "react-transition-group";
import CircularProgress from "material-ui/Progress/CircularProgress";

import Fade from "./transitions/Fade";

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
        <TransitionGroup>
          {this.props.loading && (
            <Fade key="overlay">
              <div className="LoaderContainer-overlay">
                <CircularProgress />
              </div>
            </Fade>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default LoaderContainer;
