import { FaStar } from "react-icons/fa6";

function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>by {book.author}</p>

      <div style={styles.meta}>
        <span>{book.genre}</span>
        <span>{book.format}</span>
      </div>

      <div style={styles.footer}>
        <div style={styles.rating}>
          <FaStar />
          <span>{book.rating}</span>
        </div>
        <span style={styles.status}>{book.status}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "18px",
    borderRadius: "14px",
    backgroundColor: "#fafafa",
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
 title: {
  fontSize: "16px",
  fontWeight: "600",
},

author: {
  fontSize: "13px",
  color: "#777",
},

  meta: {
    display: "flex",
    gap: "10px",
    fontSize: "12px",
    color: "#777",
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  status: {
    padding: "4px 10px",
    borderRadius: "12px",
    backgroundColor: "#eaeaea",
    fontSize: "12px",
  },
};

export default BookCard;
