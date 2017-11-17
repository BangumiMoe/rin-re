import { types, flow } from "mobx-state-tree";
import md5 from "blueimp-md5";

import Fetch from "./Fetch";

const Auth = types.compose(
  Fetch,
  types
    .model({
      loaded: false,
      currentUser: types.maybe(
        types
          .model({
            id: types.identifier(),
            username: types.string,
            emailHash: types.string,
          })
          .views(self => ({
            get avatar() {
              return `https://static.bangumi.moe/avatar/${self.emailHash}`;
            },
          })),
      ),
    })
    .actions(self => ({
      load: flow(function*() {
        const result = yield self.fetch(http => http.get("/api/user/session"));
        if (result.id) {
          self.currentUser = result;
        }
        self.loaded = true;
      }),

      login: flow(function*({ username, password }) {
        const result = yield self.fetch(http =>
          http.post("/api/user/signin", { username, password: md5(password) }),
        );
        if (result.success) {
          self.currentUser = result.user;
        }
        return result;
      }),

      logout: flow(function*() {
        const result = yield self.fetch(http =>
          http.delete("/api/user/signout"),
        );
        if (result.success) {
          self.currentUser = null;
        }
      }),
    })),
);

export default types.optional(Auth, {});
