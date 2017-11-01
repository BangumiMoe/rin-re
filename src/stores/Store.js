import { types } from "mobx-state-tree";

import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";

const Store = types.model({
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
});

export default Store;
