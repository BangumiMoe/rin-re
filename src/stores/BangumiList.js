import { types, flow, getParent } from "mobx-state-tree";

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
          http.get("/api/v2/bangumi/current"),
        );
        self.items = result.bangumis;

        const bangumis = getParent(self).bangumis;
        result.bangumis.forEach(bangumi => {
          bangumis.set(bangumi.id, bangumi);
        });
      }),
    })),
);

export default types.optional(BangumiList, {});
