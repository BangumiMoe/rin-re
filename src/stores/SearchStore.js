import { types } from "mobx-state-tree";

import SearchPaginator from "./SearchPaginator";

const SearchStore = types
  .model({
    paginators: types.optional(types.map(SearchPaginator), {}),
  })
  .views(self => ({
    has: query => self.paginators.has(query),
    get: query => self.paginators.get(query),
  }))
  .actions(self => ({
    create: query => {
      const paginator = SearchPaginator.create({
        query,
      });
      self.paginators.set(query, paginator);
    },
  }));

export default types.optional(SearchStore, {});
