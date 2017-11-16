import { types } from "mobx-state-tree";

import Auth from "./Auth";
import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";

const Store = types.model({
  auth: Auth,
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
});

export default types.optional(Store, {});
