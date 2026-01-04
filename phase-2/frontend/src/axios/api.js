import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
