import { types } from "mobx-state-tree";

const Torrent = types.model({
  id: types.identifier(),
  title: types.string,
  introduction: types.string,
  content: types.frozen,
});

export default Torrent;
