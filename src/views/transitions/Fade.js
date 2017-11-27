import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Fade.css";

const Fade = props => (
  <CSSTransition classNames="Fade" timeout={500} {...props} />
);

export default Fade;
