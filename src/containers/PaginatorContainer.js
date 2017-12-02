import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { TransitionGroup } from "react-transition-group";

import Fade from "../views/transitions/Fade";
import EmptyState from "../views/EmptyState";
import Paginator from "../views/Paginator";

import Container from "./Container";

class PaginatorContainer extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    transition: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func,
    children: PropTypes.func.isRequired,
  };
  static defaultProps = {
    transition: true,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.page !== nextProps.page;
  }

  render() {
    const { store, transition, page, onPageChange, children } = this.props;
    return (
      <Container store={store} id={page} transition={false}>
        {(data, page) =>
          transition ? (
            <TransitionGroup>
              <Fade key={page} appear exit={false}>
                <div>
                  {console.log(data)}
                  {data.length ? children(data, page) : <EmptyState />}
                  {Boolean(store.pageCount) && (
                    <Paginator
                      value={page}
                      pageCount={store.pageCount}
                      onChange={onPageChange}
                    />
                  )}
                </div>
              </Fade>
            </TransitionGroup>
          ) : (
            children(data, page)
          )
        }
      </Container>
    );
  }
}

export default observer(PaginatorContainer);
