import { types, flow } from "mobx-state-tree";

import Fetch from "./Fetch";

const SearchItem = types.frozen;

const SearchPage = types.array(SearchItem);

const SearchPaginator = types.compose(
  Fetch,
  types
    .model({
      query: types.string,
      count: 0,
      pageCount: 0,
      pages: types.optional(types.map(SearchPage), {}),
    })
    .views(self => ({
      has: page => self.pages.has(page),
      get: page => self.pages.get(page),
    }))
    .actions(self => ({
      load: flow(function*(page) {
        const result = yield self.fetch(http =>
          http.get(
            `/api/v2/torrent/search?query=${encodeURIComponent(
              self.query,
            )}&p=${page}`,
          ),
        );
        self.count = result.count;
        self.pageCount = result.pageCount;
        self.pages.set(page, result.torrents || []);
      }),
    })),
);

export default SearchPaginator;
