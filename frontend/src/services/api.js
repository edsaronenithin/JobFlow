import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  // withCredentials: true, // enable if you later use cookies
});

export default api;
