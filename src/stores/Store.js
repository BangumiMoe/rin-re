import { types } from "mobx-state-tree";

import Auth from "./Auth";
import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";
import SearchPaginator from "./SearchPaginator";
import BangumiList from "./BangumiList";

const Store = types.model({
  auth: Auth,
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
  searchPaginator: SearchPaginator,
  bangumiList: BangumiList,
});

export default types.optional(Store, {});
