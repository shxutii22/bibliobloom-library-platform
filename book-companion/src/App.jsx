import { BrowserRouter, Routes, Route,  Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import TBR from "./pages/TBR";
import Stats from "./pages/Stats";
import Login from "./pages/Login";

import {
  fetchBooks,
  createBook,
  updateBook as updateBookApi,
  deleteBook as deleteBookApi,
} from "./api/bookApi";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);   // ✅ auto-login on refresh
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const res = await fetchBooks();
      console.log("📚 Books from backend:", res.data);
      setBooks(res.data);
      localStorage.setItem("books", JSON.stringify(res.data));
    } catch (error) {
  console.error("Backend error", error);
  setBooks([]);   // show empty or error UI
} finally {
      setLoading(false);
    }
  }

  async function addBook(book) {
    try {
      await createBook(book);
      await loadBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to add book");
    }
  }

  async function deleteBook(id) {
    try {
      await deleteBookApi(id);
      await loadBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  }

  async function updateBook(updatedBook) {
    try {
      await updateBookApi(updatedBook.id, updatedBook);
      await loadBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to update book");
    }
  }

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading your library…</p>;
  }

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />


      <main style={{ padding: "24px" }}>
        <Routes>
          {/* LOGIN (Public) */}
         <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />


          {/* HOME (Protected) */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <BookList books={books} onDelete={deleteBook} />
              </ProtectedRoute>
            }
          />

          {/* ADD (Protected) */}
          <Route
            path="/add"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <AddBook onAddBook={addBook} />
              </ProtectedRoute>
            }
          />

          {/* DETAILS (Protected) */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <BookDetails books={books} />
              </ProtectedRoute>
            }
          />

          {/* EDIT (Protected) */}
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <EditBook books={books} onUpdateBook={updateBook} />
              </ProtectedRoute>
            }
          />

          {/* TBR (Protected) */}
          <Route
            path="/tbr"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <TBR />
              </ProtectedRoute>
            }
          />

          {/* STATS (Protected) */}
          <Route
            path="/stats"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Stats />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
