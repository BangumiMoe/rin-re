import { types, flow, getEnv } from "mobx-state-tree";

const fetch = () => {
  return types
    .model({
      state: types.optional(
        types.enumeration(["initial", "loading", "done", "error"]),
        "initial",
      ),
    })
    .actions(self => {
      return {
        fetch: flow(function*(factory) {
          const http = getEnv(self).http;

          self.state = "loading";
          try {
            const response = yield factory(http);
            self.state = "done";
            return response.data;
          } catch (error) {
            self.state = "error";
            throw error;
          }
        }),
      };
    });
};

export default fetch;
