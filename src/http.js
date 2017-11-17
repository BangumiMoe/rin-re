import axios from "axios";
import humps from "humps";

const http = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://bangumi.moe/" : "/",
  withCredentials: true,
  transformRequest: [
    (data, headers) => {
      headers["Content-Type"] = "application/json";
      return JSON.stringify(humps.decamelizeKeys(data));
    },
  ],
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
