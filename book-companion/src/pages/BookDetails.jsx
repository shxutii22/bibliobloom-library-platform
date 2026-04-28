import { useParams, Link } from "react-router-dom";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaStar,
  FaHeart,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

function BookDetails({ books }) {
  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <p style={styles.notFound}>Book not found 📖</p>;
  }

  function getReadingDays() {
    if (!book.startDate || !book.endDate) return null;

    const start = new Date(book.startDate);
    const end = new Date(book.endDate);

    return Math.round(
      Math.abs((end - start) / (1000 * 60 * 60 * 24))
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>
        <FaArrowLeft /> Back to Library
      </Link>

      <div style={styles.card}>
        <h1 style={styles.title}>{book.title}</h1>
        <p style={styles.author}>by {book.author}</p>

        <div style={styles.row}>
          <span>
            <FaBookOpen /> {book.totalPages || "—"} pages
          </span>
          <span>📕 {book.binding || "Physical"}</span>
        </div>

        <div style={styles.row}>
          <span>
            <FaCalendarAlt /> {book.startDate || "N/A"}
          </span>
          <span>→ {book.endDate || "N/A"}</span>
        </div>

        {getReadingDays() && (
          <p style={styles.days}>
            Finished in <strong>{getReadingDays()}</strong> days
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

        <div style={styles.actions}>
          <Link to={`/edit/${book.id}`} style={styles.editBtn}>
            <FaEdit /> Edit Book
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "#555",
    marginBottom: "20px",
    fontSize: "14px",
  },

  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "22px",
    boxShadow:
      "0 12px 30px rgba(0, 0, 0, 0.08)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  author: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
    marginBottom: "12px",
  },

  days: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "16px",
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "15px",
    marginBottom: "16px",
  },

  review: {
    fontSize: "15px",
    fontStyle: "italic",
    color: "#444",
    marginBottom: "18px",
  },

  recommend: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#555",
    marginBottom: "24px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },

  editBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "12px",
    fontSize: "14px",
  },

  notFound: {
    textAlign: "center",
    marginTop: "40px",
    color: "#888",
  },
};

export default BookDetails;
