import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import RSSFeedIcon from "react-icons/lib/md/rss-feed";

import * as link from "../utils/link";

import IconButton from "./IconButton";

class RSSButton extends React.Component {
  static propTypes = {
    query: PropTypes.string,
  };

  render() {
    const { t, query } = this.props;
    return (
      <IconButton
        component="a"
        target="_blank"
        href={query ? link.searchRSS(query) : link.rss()}
        title={t("RSS Feed")}
        aria-label={t("RSS Feed")}
      >
        <RSSFeedIcon />
      </IconButton>
    );
  }
}

export default translate()(RSSButton);
