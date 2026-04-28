import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

function EditBook({ books, onUpdateBook }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert id safely (Spring Boot uses Long)
  const bookId = Number(id);

  // Find book
  const bookToEdit = books.find(
    (book) => Number(book.id) === bookId
  );

  // Loading / safety state
  if (!books || books.length === 0) {
    return <p style={{ padding: "40px" }}>Loading book...</p>;
  }

  if (!bookToEdit) {
    return <p style={{ padding: "40px" }}>Book not found.</p>;
  }

  function handleUpdate(updatedData) {
    // IMPORTANT: keep backend ID intact
    const updatedBook = {
      ...updatedData,
      id: bookToEdit.id,
    };

    onUpdateBook(updatedBook);
    navigate("/");
  }

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "8px" }}>Edit Book</h1>
        <p style={{ color: "#666" }}>
          Update your reading experience ✏️
        </p>
      </div>

      <BookForm
        initialData={bookToEdit}
        onSubmit={handleUpdate}
        isEdit={true}
      />
    </>
  );
}

export default EditBook;
