import React from "react";
import { Provider } from "mobx-react";
import { Switch, Route } from "react-router-dom";

import api from "./api";
import Store from "./stores/Store";

import Home from "./pages/Home";
import Torrent from "./pages/Torrent";

class App extends React.Component {
  store = Store.create({}, { api });

  render() {
    return (
      <Provider store={this.store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/torrents/:id" component={Torrent} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
