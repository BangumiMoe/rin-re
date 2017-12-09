const HOST = "https://bangumi.moe";
const HOST_STATIC = "https://static.bangumi.moe";

export const avatar = user => `${HOST_STATIC}/avatar/${user.emailHash}`;

export const bangumiIcon = bangumi => `${HOST_STATIC}/${bangumi.icon}`;

export const download = torrent =>
  `${HOST}/download/torrent/${torrent.id}/${encodeURIComponent(
    torrent.title,
  )}.torrent`;

export const rss = () => `${HOST}/rss/latest`;
export const searchRSS = query =>
  `${HOST}/rss/search/${encodeURIComponent(query)}`;
