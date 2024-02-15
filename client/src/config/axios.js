import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: `http://localhost:4075`,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});
