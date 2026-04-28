import axios from "axios";

const BASE_URL = "http://localhost:8080/books";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // same key you used while storing token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// GET all books
export const fetchBooks = () => {
  return api.get("/books");
};

// ADD book
export const createBook = (book) => {
  return api.post("/books", book);
};

// UPDATE book
export const updateBook = (id, book) => {
  return api.put(`/books/${id}`, book);
};

// DELETE book
export const deleteBook = (id) => {
  return api.delete(`/books/${id}`);
};
