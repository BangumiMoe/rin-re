import { types, flow } from "mobx-state-tree";

import Fetch from "./Fetch";

const Bangumi = types.frozen;

const BangumiStore = types.compose(
  Fetch,
  types
    .model({
      items: types.optional(types.map(Bangumi), {}),
    })
    .views(self => ({
      has: id => self.items.has(id),
      get: id => self.items.get(id),
    }))
    .actions(self => ({
      set: (id, item) => self.items.set(id, item),
      load: flow(function*(id) {
        const result = yield self.fetch(http =>
          http.get(`/api/v2/bangumi/${id}`),
        );
        self.items.set(id, result);
      }),
    })),
);

export default types.optional(BangumiStore, {});
