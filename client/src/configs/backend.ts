import axios from "axios";
const backendConfig = { baseUrl: "", baseUrlDev: "http://127.0.0.1:8000" };
// export default backendConfig;
const BASE_URL = backendConfig.baseUrlDev;

var client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default client;
