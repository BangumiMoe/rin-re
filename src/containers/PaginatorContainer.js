import React from "react";
import PropTypes from "prop-types";

import { TransitionGroup } from "react-transition-group";

import Fade from "../views/transitions/Fade";
import Paginator from "../views/Paginator";
import Container from "./Container";

class PaginatorContainer extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    transition: PropTypes.bool,
    onPageChange: PropTypes.func,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    transition: true,
  };

  render() {
    const store = this.props.store;
    return (
      <Container store={store} id={this.props.page} transition={false}>
        {(data, page) => (
          <div>
            {this.props.transition ? (
              <TransitionGroup>
                <Fade key={page} appear exit={false}>
                  {this.props.children(data, page)}
                </Fade>
              </TransitionGroup>
            ) : (
              this.props.children(data, page)
            )}
            <Paginator
              value={page}
              pageCount={store.pageCount}
              onChange={this.props.onPageChange}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default PaginatorContainer;
