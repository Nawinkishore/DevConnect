// api/api.ts
import axios from "axios";
import { store } from "../store/store";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
export const backendUrl = "http://localhost:5000/api";
// Attach access token on every request
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
