import axios from "axios";
import humps from "humps";

const http = axios.create({
  transformResponse: [
    data => {
      try {
        return humps.camelizeKeys(JSON.parse(data));
      } catch (error) {
        return data;
      }
    },
  ],
});

export default http;
