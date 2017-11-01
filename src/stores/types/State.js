import { types } from "mobx-state-tree";

const State = types.optional(
  types.enumeration(["initial", "loading", "done", "error"]),
  "initial",
);

export default State;
