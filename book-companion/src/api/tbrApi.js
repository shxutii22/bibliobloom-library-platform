import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// GET TBR list
export const fetchTbr = () => {
  return api.get("/tbr");
};

// ADD TBR book
export const addTbr = (title) => {
  return api.post("/tbr", { title, completed: false });
};

// TOGGLE completed (adjust path if your backend is different)
export const toggleTbr = (id) => {
  return api.put(`/tbr/${id}`);
};

// DELETE TBR book
export const deleteTbr = (id) => {
  return api.delete(`/tbr/${id}`);
};
