import { types } from "mobx-state-tree";

import Auth from "./Auth";
import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";
import SearchPaginator from "./SearchPaginator";

const Store = types.model({
  auth: Auth,
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
  searchPaginator: SearchPaginator,
});

export default types.optional(Store, {});
