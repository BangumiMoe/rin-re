import { types, flow } from "mobx-state-tree";

import Fetch from "./Fetch";

const BangumiItem = types.frozen;

const BangumiList = types.compose(
  Fetch,
  types
    .model({
      items: types.maybe(types.array(BangumiItem)),
    })
    .views(self => ({
      get: () => self.items,
      has: () => Boolean(self.items),
    }))
    .actions(self => ({
      load: flow(function*() {
        const result = yield self.fetch(http =>
          http.get("/api/bangumi/current"),
        );
        self.items = result;
      }),
    })),
);

export default types.optional(BangumiList, {});
