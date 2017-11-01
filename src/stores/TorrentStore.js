import { types, flow, getEnv } from "mobx-state-tree";

import State from "./types/State";
import Torrent from "./Torrent";

const TorrentStore = types
  .model({
    state: State,
    items: types.optional(types.map(Torrent), {}),
  })
  .views(self => ({
    has: id => self.items.has(id),
    get: id => self.items.get(id),
  }))
  .actions(self => ({
    load: flow(function*(id) {
      self.state = "loading";
      try {
        const result = (yield getEnv(self).api.torrents.get(id)).data;
        self.items.set(id, result);
      } catch (err) {
        self.state = "error";
        throw err;
      }
    }),
  }));

export default types.optional(TorrentStore, {});
