import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Fade.css";

const Fade = props => (
  <CSSTransition {...props} classNames="Fade" timeout={500} />
);

export default Fade;
