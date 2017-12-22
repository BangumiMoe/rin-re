import { types } from "mobx-state-tree";

import Auth from "./Auth";
import TorrentStore from "./TorrentStore";
import TorrentPaginator from "./TorrentPaginator";
import SearchStore from "./SearchStore";
import BangumiList from "./BangumiList";
import BangumiStore from "./BangumiStore";

const Store = types.model({
  auth: Auth,
  torrents: TorrentStore,
  torrentPaginator: TorrentPaginator,
  search: SearchStore,
  bangumiList: BangumiList,
  bangumis: BangumiStore,
});

export default types.optional(Store, {});
