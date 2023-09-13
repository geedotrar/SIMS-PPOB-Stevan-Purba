import axios from "axios";

const instance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
