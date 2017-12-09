import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import Schedule from "react-icons/lib/md/schedule";

import SectionTitle from "../views/SectionTitle";
import BangumiSchedule from "../views/BangumiSchedule";

import Container from "../containers/Container";

class BangumiList extends React.Component {
  get bangumi() {
    return this.props.store.bangumiList;
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Helmet title={t("Bangumi List")} />
        <SectionTitle icon={Schedule} title={t("Bangumi Schedule")} />
        <Container store={this.bangumi} id="data">
          {list => <BangumiSchedule list={list} />}
        </Container>
      </div>
    );
  }
}

export default translate()(inject("store")(BangumiList));
