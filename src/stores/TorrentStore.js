import { types } from "mobx-state-tree";

import api from "./utils/api";
import Torrent from "./Torrent";

const TorrentStore = types
  .model({
    items: types.optional(types.map(Torrent), {}),
  })
  .views(self => ({
    has: id => self.items.has(id),
    get: id => self.items.get(id),
  }))
  .props(api.props)
  .extend(self =>
    api(self, function*({ api, token }, id) {
      const request = api.torrents.get(id, { cancelToken: token });
      const result = (yield request).data;
      self.items.set(id, result);
    }),
  );

export default types.optional(TorrentStore, {});
