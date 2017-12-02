import React from "react";
import { translate } from "react-i18next";

import SearchIcon from "react-icons/lib/md/search";

import SectionTitle from "../views/SectionTitle";
import SearchEditor from "../views/SearchEditor";

class Search extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div className="Search">
        <SearchEditor />
        <SectionTitle icon={SearchIcon} title={t("Search Result")} />
      </div>
    );
  }
}

export default translate()(Search);
