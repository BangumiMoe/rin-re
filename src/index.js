import "./polyfills";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "normalize.css/normalize.css";
import "./fonts";
import "./index.css";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root"),
);

if (process.env.NODE_ENV === "development") {
  require("./debug");
}
