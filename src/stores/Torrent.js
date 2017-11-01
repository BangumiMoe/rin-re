import { types } from "mobx-state-tree";

const Torrent = types.model({
  id: types.identifier(),
  title: types.string,
});

export default Torrent;
