import axios from "axios";
const backendConfig = { baseUrl: "", baseUrlDev: "http://172.105.186.173:1339" };
// export default backendConfig;
const BASE_URL = backendConfig.baseUrlDev;

var client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default client;
