import camelcase from "camelcase-keys";
import axios from "axios";

const http = axios.create({
  transformResponse: [data => camelcase(JSON.parse(data), { deep: true })],
});

export default {
  torrents: {
    get: id => http.get(`/api/v2/torrent/${id}`),
    getPage: page => http.get(`/api/v2/torrent/page/${page}`),
  },
};
