import { types } from "mobx-state-tree";

import Auth from "./Auth";
import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";
import SearchPaginator from "./SearchPaginator";
import BangumiList from "./BangumiList";
import BangumiStore from "./BangumiStore";

const Store = types.model({
  auth: Auth,
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
  searchPaginator: SearchPaginator,
  bangumiList: BangumiList,
  bangumis: BangumiStore,
});

export default types.optional(Store, {});
