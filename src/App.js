import React from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";

import Paper from "material-ui/Paper";

import http from "./http";
import Store from "./stores/Store";

import Theme from "./Theme";
import ScrollManager from "./views/effects/ScrollManager";
import AppHeader from "./views/AppHeader";
import AppFooter from "./views/AppFooter";
import Home from "./pages/Home";
import Torrent from "./pages/Torrent";

import "./App.css";

class App extends React.Component {
  store = Store.create({}, { http });

  render() {
    return (
      <Provider store={this.store}>
        <Theme>
          <div className="App">
            <Paper className="App-content">
              <AppHeader />
              <main>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/torrent/:id" component={Torrent} />
                </Switch>
              </main>
            </Paper>
            <AppFooter />
            <ScrollManager />
          </div>
        </Theme>
      </Provider>
    );
  }
}

export default App;
