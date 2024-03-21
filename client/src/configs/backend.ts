import axios from "axios";
const backendConfig = { baseUrl: "", baseUrlDev: "https://angeprince.com" };
// export default backendConfig;
const BASE_URL = backendConfig.baseUrlDev;

var client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default client;
