import { types, flow, getEnv } from "mobx-state-tree";

import State from "./types/State";

const TorrentItem = types.model({
  id: types.identifier(),
  title: types.string,
});

const TorrentPage = types.array(TorrentItem);

const TorrentPaginator = types
  .model({
    state: State,
    pageSize: 0,
    pages: types.optional(types.map(TorrentPage), {}),
  })
  .views(self => ({
    hasPage: page => self.pages.has(page),
    getPage: page => self.pages.get(page),
  }))
  .actions(self => ({
    loadPage: flow(function*(page) {
      self.state = "loading";
      try {
        const result = (yield getEnv(self).api.torrents.getPage(page)).data;
        self.state = "done";
        self.pageSize = result.pageCount;
        self.pages.set(page, result.torrents);
      } catch (err) {
        self.state = "error";
        throw err;
      }
    }),
  }));

export default types.optional(TorrentPaginator, {});
