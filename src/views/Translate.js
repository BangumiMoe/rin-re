import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import humps from "humps";

class Translate extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    locales: PropTypes.object.isRequired,
  };

  render() {
    const { t, value, locales } = this.props;
    return locales[humps.camelize(t("locale"))] || value || null;
  }
}

export default translate()(Translate);
