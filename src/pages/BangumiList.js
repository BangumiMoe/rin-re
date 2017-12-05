import React from "react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

class BangumiList extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Helmet title={t("Bangumi List")} />
      </div>
    );
  }
}

export default translate()(BangumiList);
