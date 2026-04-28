import {
  FaBookOpen,
  FaCalendarAlt,
  FaStar,
  FaHeart,
  FaEdit,
  FaTrash,

} from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";

import { Link } from "react-router-dom";
import { useState } from "react";
import HeroSection from "../components/HeroSection";

function BookList({ books, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showRecommended, setShowRecommended] = useState(false);
  const [bindingFilter, setBindingFilter] = useState("");

  if (!books || books.length === 0) {
    return (
      <p style={styles.empty}>
        No books added yet 🌷 <br />
        Start building your reading journey.
      </p>
    );
  }

  // 🔹 Helper: calculate reading duration in days
  function getReadingDays(book) {
    if (!book.startDate || !book.endDate) return null;

    const start = new Date(book.startDate);
    const end = new Date(book.endDate);

    return Math.round(
      Math.abs((end - start) / (1000 * 60 * 60 * 24))
    );
  }

  // 🔹 Derived books
  let displayBooks = [...books];

  // 🔍 Search filter
  if (search.trim() !== "") {
    displayBooks = displayBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  // ❤️ Recommended filter
  if (showRecommended) {
    displayBooks = displayBooks.filter((book) => book.recommend);
  }

  // 📕 Binding filter
  if (bindingFilter) {
    displayBooks = displayBooks.filter(
      (book) => book.binding === bindingFilter
    );
  }

  // 🔃 Sorting
  if (sortBy === "rating") {
    displayBooks.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "cost") {
    displayBooks.sort((a, b) => a.cost - b.cost);
  }

  if (sortBy === "pages") {
    displayBooks.sort(
      (a, b) => (b.totalPages || 0) - (a.totalPages || 0)
    );
  }

  if (sortBy === "shortDuration") {
    displayBooks.sort(
      (a, b) =>
        (getReadingDays(a) ?? Infinity) -
        (getReadingDays(b) ?? Infinity)
    );
  }

  if (sortBy === "longDuration") {
    displayBooks.sort(
      (a, b) =>
        (getReadingDays(b) ?? 0) -
        (getReadingDays(a) ?? 0)
    );
  }

  return (
    <>
     <HeroSection />
      {/* 🔹 Controls */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by title or author.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort by</option>
          <option value="rating">Rating</option>
          <option value="cost">Cost</option>
          <option value="pages">Lengthy Books</option>
          <option value="shortDuration">Shortest Reading Time</option>
          <option value="longDuration">Longest Reading Time</option>
        </select>

        <select
          value={bindingFilter}
          onChange={(e) => setBindingFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Bindings</option>
          <option value="Paperback">Paperback</option>
          <option value="Hardcover">Hardcover</option>
          <option value="E-Book">E-Book</option>

        </select>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={showRecommended}
            onChange={(e) => setShowRecommended(e.target.checked)}
          />
          Recommended
        </label>
      </div>

      {/* 🔹 Book Grid */}
      <div style={styles.grid}>
        {displayBooks.map((book) => (
         <div
  key={book.id}
  style={styles.card}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow =
      "0 12px 30px rgba(0,0,0,0.12)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)";
  }}
>

            <div style={styles.actions}>
              <Link
              to={`/edit/${book.id}`}
              style={styles.iconBtn}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              >
              <FaEdit />
              </Link>

              <button
                onClick={() => onDelete(book.id)}
                style={styles.iconBtn}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              >
                <FaTrash />
              </button>
            </div>

            <h3 style={styles.title}>{book.title}</h3>
            <p style={styles.author}>by {book.author}</p>

            <div style={styles.meta}>
              <span>
                <FaBookOpen /> {book.totalPages || "—"} pages
              </span>
              <span>📕 {book.binding || "Physical"}</span>
              <span style={styles.price}><TbMoneybag /> ₹{book.cost || "—"}</span>

            </div>

            <div style={styles.meta}>
              <span>
                <FaCalendarAlt /> {book.startDate || "N/A"}
              </span>
              <span>→ {book.endDate || "N/A"}</span>
            </div>

            {getReadingDays(book) !== null && (
              <p style={styles.days}>
                Days taken: <strong>{getReadingDays(book)}</strong>
              </p>
            )}

            <div style={styles.rating}>
              <FaStar /> {book.rating}/5
            </div>

            <p style={styles.review}>“{book.review}”</p>

            <div style={styles.recommend}>
              <FaHeart color={book.recommend ? "#e25555" : "#ccc"} />
              <span>
                {book.recommend ? "Recommended" : "Not recommended"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  controls: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  search: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "13px",
    minWidth: "220px",
  },

  select: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "13px",
  },

  checkbox: {
    fontSize: "14px",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "28px",
  },

 card: {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "22px",
  position: "relative",
  border: "1px solid rgba(0,0,0,0.03)",
  boxShadow:
    "0 6px 18px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
},
price: {
  fontWeight: "600",
  
},



  actions: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
    display: "flex",
    gap: "12px",
  },

 iconBtn: {
  background: "#f6f6f6",
  border: "none",
  cursor: "pointer",
  color: "#666",
  fontSize: "13px",
  padding: "6px",
  borderRadius: "50%",
  transition: "background 0.2s ease, color 0.2s ease",
},

  title: {
    fontSize: "18px",
    marginBottom: "4px",
  },

  author: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "14px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#555",
    marginBottom: "10px",
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    marginBottom: "10px",
  },

  review: {
    fontSize: "15px",
    color: "#444",
    marginBottom: "12px",
  },

  days: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },

  recommend: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#555",
  },

  empty: {
    textAlign: "center",
    marginTop: "40px",
    color: "#888",
  },
};

export default BookList;
