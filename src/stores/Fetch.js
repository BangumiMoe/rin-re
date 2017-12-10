import { types, flow, getEnv } from "mobx-state-tree";
import uuid from "uuid/v4";

const Fetch = types
  .model({
    state: types.optional(
      types.enumeration(["loading", "done", "error"]),
      "done",
    ),
  })
  .actions(self => {
    let currentId = null;

    return {
      fetch: flow(function*(factory) {
        const http = getEnv(self).http;

        const id = uuid();
        currentId = id;

        self.state = "loading";
        try {
          const response = yield factory(http);
          if (currentId === id) {
            self.state = "done";
          }
          return response.data;
        } catch (error) {
          if (currentId === id) {
            self.state = "error";
          }
          throw error;
        }
      }),
    };
  });

export default Fetch;
