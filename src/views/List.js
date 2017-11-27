import React from "react";
import classNames from "classnames";

import ButtonBase from "./ButtonBase";

import "./List.css";

class List extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return <ul className={classNames("List", className)} {...props} />;
  }
}

const ListItem = ({ className, ...props }) => (
  <li className="List-item">
    <ButtonBase className={classNames("List-button", className)} {...props} />
  </li>
);

export default List;
export { ListItem };
