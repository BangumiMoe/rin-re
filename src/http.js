import axios from "axios";
import humps from "humps";

const http = axios.create({
  transformResponse: [data => humps.camelizeKeys(JSON.parse(data))],
});

export default http;
