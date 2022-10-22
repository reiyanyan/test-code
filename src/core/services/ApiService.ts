import APP_INFO from "@/core/constants";
import axios from "axios";

const instance = axios.create({
  baseURL: APP_INFO.API_BASE_URL,
});

export default instance;
