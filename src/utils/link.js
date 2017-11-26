const HOST = "https://bangumi.moe";
const HOST_STATIC = "https://static.bangumi.moe";

export const avatar = user => `${HOST_STATIC}/avatar/${user.emailHash}`;

export const download = torrent =>
  `${HOST}/download/torrent/${torrent.id}/${encodeURIComponent(
    torrent.title,
  )}.torrent`;
