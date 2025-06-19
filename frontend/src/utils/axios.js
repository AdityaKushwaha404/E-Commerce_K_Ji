import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ uses VITE_BACKEND_URL
//   withCredentials: true, // Optional: if you're using cookies or JWT in cookies
});

export default api;
