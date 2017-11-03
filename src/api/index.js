import axios from "axios";
import humps from "humps";

const http = axios.create({
  transformResponse: [data => humps.camelizeKeys(JSON.parse(data))],
});

export default {
  torrents: {
    get: id => http.get(`/api/v2/torrent/${id}`),
    getPage: page => http.get(`/api/v2/torrent/page/${page}`),
  },
};
