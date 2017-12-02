import { types, flow } from "mobx-state-tree";

import Fetch from "./Fetch";

const TorrentItem = types.frozen;

const TorrentPage = types.array(TorrentItem);

const TorrentPaginator = types.compose(
  Fetch,
  types
    .model({
      count: 0,
      pageCount: 0,
      pages: types.optional(types.map(TorrentPage), {}),
    })
    .views(self => ({
      has: page => self.pages.has(page),
      get: page => self.pages.get(page),
    }))
    .actions(self => ({
      load: flow(function*(page) {
        const result = yield self.fetch(http =>
          http.get(`/api/v2/torrent/page/${page}`),
        );
        self.count = result.count;
        self.pageCount = result.pageCount;
        self.pages.set(page, result.torrents);
      }),
    })),
);

export default types.optional(TorrentPaginator, {});
