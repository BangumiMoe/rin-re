import React from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import { I18nextProvider, I18n } from "react-i18next";
import Helmet from "react-helmet";

import http from "./http";
import Store from "./stores/Store";

import Theme from "./Theme";
import ScrollManager from "./views/effects/ScrollManager";
import AppHeader from "./views/AppHeader";
import AppFooter from "./views/AppFooter";
import Home from "./pages/Home";
import Torrent from "./pages/Torrent";

import i18n from "./i18n";

import "./App.css";

class App extends React.Component {
  store = Store.create({}, { http });

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={this.store}>
          <Theme>
            <div className="App">
              <I18n>
                {t => (
                  <Helmet
                    defaultTitle={t("Bangumi Moe")}
                    titleTemplate={`%s - ${t("Bangumi Moe")}`}
                  />
                )}
              </I18n>

              <AppHeader />
              <main id="main" className="App-content">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/torrent/:id" component={Torrent} />
                </Switch>
              </main>
              <AppFooter />

              <ScrollManager />
            </div>
          </Theme>
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
