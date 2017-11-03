import React from "react";
import { withRouter } from "react-router-dom";

class ScrollManager extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.key !== prevProps.location.key &&
      this.props.history.action === "PUSH"
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollManager);
