import React from "react";
import classNames from "classnames";

import ButtonBase from "./ButtonBase";

import "./List.css";

const List = ({ className, ...props }) => (
  <ul className={classNames("List", className)} {...props} />
);

const ListItem = ({ className, buttonClassName, ...props }) => (
  <li className={classNames("List-item", className)}>
    <ButtonBase
      className={classNames("List-button", buttonClassName)}
      {...props}
    />
  </li>
);

export default List;
export { ListItem };
