import React from "react";

const getSearchParams = props => new URLSearchParams(props.location.search);

const injectSearchParams = Component => props => (
  <Component searchParams={getSearchParams(props)} {...props} />
);

export default injectSearchParams;
