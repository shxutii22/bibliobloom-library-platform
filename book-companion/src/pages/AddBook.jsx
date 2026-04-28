import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

function AddBook({ onAddBook }) {
  const navigate = useNavigate();

  function handleAddBook(bookData) {
    onAddBook(bookData);     // save book in App.jsx
    navigate("/");           // go back to Home
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Add a New Book</h1>
        <p style={styles.subtitle}>
          Capture your reading journey 🌸
        </p>

        <BookForm onSubmit={handleAddBook} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    marginBottom: "6px",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "15px",
  },
};

export default AddBook;
