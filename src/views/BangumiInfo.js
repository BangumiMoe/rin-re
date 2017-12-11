import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import * as link from "../utils/link";

import Translate from "./Translate";
import TagList from "./TagList";

import "./BangumiInfo.css";

class BangumiInfo extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <article className="BangumiInfo">
        <Translate value={item.tag.name} locales={item.tag.locale}>
          {name => <Helmet title={name} />}
        </Translate>

        <img className="BangumiInfo-cover" src={link.bangumiIcon(item)} />
        <header className="BangumiInfo-content">
          <h1 className="BangumiInfo-title">
            <Translate value={item.tag.name} locales={item.tag.locale} />
          </h1>
          <p className="BangumiInfo-credit">{item.credit}</p>
          <div className="BangumiInfo-tags">
            <TagList
              list={item.workingTeams.map(team => team.tag)}
              link={teamTag =>
                `/search?query=${encodeURIComponent(
                  [item.tag, teamTag].map(tag => "`" + tag.id + "`").join(" "),
                )}`
              }
            />
          </div>
        </header>
      </article>
    );
  }
}

export default BangumiInfo;
