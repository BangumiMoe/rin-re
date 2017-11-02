import { types, flow, getEnv } from "mobx-state-tree";
import axios from "axios";

const api = (self, fn) => {
  let source = null;

  const abort = () => {
    if (source) {
      source.cancel();
      source = null;
    }
  };

  const load = flow(function*(...args) {
    abort();

    const api = getEnv(self).api;

    self.state = "loading";
    try {
      source = axios.CancelToken.source();
      yield* fn({ api, token: source.token }, ...args);
      self.state = "done";
    } catch (error) {
      if (axios.isCancel(error)) {
        self.state = "done";
        return;
      }
      self.state = "error";
      return;
    }
  });

  return {
    actions: { load, abort },
  };
};

api.props = {
  state: types.optional(
    types.enumeration(["initial", "loading", "done", "error"]),
    "initial",
  ),
};

export default api;
