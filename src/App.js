import React from "react";
import { Provider } from "mobx-react";
import { Switch, Route, Redirect } from "react-router-dom";
import { I18nextProvider, I18n } from "react-i18next";
import Helmet from "react-helmet";

import http from "./http";
import Store from "./stores/Store";

import ScrollManager from "./views/effects/ScrollManager";
import AppHeader from "./views/AppHeader";
import AppFooter from "./views/AppFooter";

import Home from "./pages/Home";
import Torrent from "./pages/Torrent";
import Search from "./pages/Search";
import BangumiList from "./pages/BangumiList";

import i18n from "./i18n";

import "./App.css";

class App extends React.Component {
  store = Store.create({}, { http });

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={this.store}>
          <div className="App">
            <I18n>
              {t => (
                <Helmet
                  defaultTitle={t("Bangumi Moe")}
                  titleTemplate={`%s - ${t("Bangumi Moe")}`}
                />
              )}
            </I18n>

            <div className="App-layout">
              <AppHeader />
              <main id="main" className="App-content">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/torrent/:id" component={Torrent} />
                  <Route
                    path="/tag/:id"
                    render={({ match }) => (
                      <Redirect
                        to={`/search?query=${encodeURIComponent(
                          "`" + match.params.id + "`",
                        )}`}
                      />
                    )}
                  />
                  <Route path="/search" component={Search} />
                  <Route path="/bangumi/list" component={BangumiList} />
                </Switch>
              </main>
              <AppFooter />
            </div>

            <ScrollManager />
          </div>
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
