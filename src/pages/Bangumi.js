import React from "react";
import { inject } from "mobx-react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import Container from "../containers/Container";

class Bangumi extends React.Component {
  get bangumis() {
    return this.props.store.bangumis;
  }

  get id() {
    return this.props.match.params.id;
  }

  render() {
    const { t } = this.props;
    return (
      <div className="Bangumi">
        <Helmet title={t("Bangumi")} />

        <Container store={this.bangumis} id={this.id}>
          {bangumi => <div>{JSON.stringify(bangumi)}</div>}
        </Container>
      </div>
    );
  }
}

export default translate()(inject("store")(Bangumi));
