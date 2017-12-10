import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import humps from "humps";

class Translate extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    locales: PropTypes.object.isRequired,
    children: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.t !== nextProps.t ||
      this.props.value !== nextProps.value ||
      this.props.locales !== nextProps.locales
    );
  }

  render() {
    const { t, value, locales, children } = this.props;
    const text = locales[humps.camelize(t("locale"))] || value || null;
    if (children) {
      return children(text);
    }
    return text;
  }
}

export default translate()(Translate);
