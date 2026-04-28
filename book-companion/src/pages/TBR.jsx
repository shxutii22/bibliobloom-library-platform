import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  fetchTbr,
  addTbr,
  toggleTbr,
  deleteTbr,
} from "../api/tbrApi";

function TBR() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTbr();
  }, []);

  async function loadTbr() {
    try {
      setLoading(true);
      const res = await fetchTbr();
      setBooks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load TBR list 😔");
    } finally {
      setLoading(false);
    }
  }

  async function addBook() {
    if (!newBook.trim()) return;

    try {
      await addTbr(newBook.trim());
      setNewBook("");
      loadTbr();
    } catch {
      alert("Failed to add book");
    }
  }

  async function toggleBook(id) {
    try {
      await toggleTbr(id);
      loadTbr();
    } catch {
      alert("Failed to update book");
    }
  }

  async function deleteBook(id) {
    try {
      await deleteTbr(id);
      loadTbr();
    } catch {
      alert("Failed to delete book");
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <p>Loading your TBR list…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* LEFT */}
      <div style={styles.left}>
        <h2 style={styles.title}>My TBR List!</h2>
        <p style={styles.subtitle}>
          Books I’m manifesting into my reading life.
        </p>

        {/* Add Book */}
        <div style={styles.inputWrap}>
          <input
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
            placeholder="Add a book..."
            style={styles.input}
          />
          <button onClick={addBook} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Checklist */}
        <div style={styles.list}>
          {books.length === 0 && (
            <p style={styles.empty}>
              Your TBR list is waiting for its first book.
            </p>
          )}

          {books.map((book) => (
            <div key={book.id} style={styles.item}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={book.completed}
                  onChange={() => toggleBook(book.id)}
                />
                <span
                  style={{
                    textDecoration: book.completed
                      ? "line-through"
                      : "none",
                    color: book.completed ? "#999" : "#333",
                  }}
                >
                  {book.title}
                </span>
              </label>

              <button
                onClick={() => deleteBook(book.id)}
                style={styles.deleteBtn}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <img
          src="/tbr.png"
          alt="Reading illustration"
          style={styles.image}
        />
      </div>
    </div>
  );
}
const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#f1f3f5",
    padding: "48px 60px",
    display: "flex",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
  },

  left: {
    flex: "1",
    maxWidth: "520px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "10px",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "26px",
    lineHeight: "1.6",
  },

  inputWrap: {
    display: "flex",
    gap: "12px",
    marginBottom: "26px",
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  addBtn: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxHeight: "360px",
    overflowY: "auto",
    paddingRight: "6px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "14px 16px",
    borderRadius: "14px",
  },

  label: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    fontSize: "15px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "14px",
  },

  empty: {
    fontSize: "14px",
    color: "#888",
    marginTop: "12px",
  },

  right: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    maxWidth: "420px",
    height: "auto",
    objectFit: "contain",
  },
};


export default TBR;
