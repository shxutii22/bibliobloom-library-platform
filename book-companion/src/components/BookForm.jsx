import { useState } from "react";

function BookForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    genre: initialData.genre || "",
    cost: initialData.cost || "",
    totalPages: initialData.totalPages || "",
    format: initialData.format || "Physical",
    binding: initialData.binding || "Paperback",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    rating: initialData.rating || "",
    recommend: initialData.recommend || false,
    review: initialData.review || "",
    status: initialData.status || "Completed",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
   <div style={styles.wrapper}>
  <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Book :</h2>

      <input
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="cost"
        type="number"
        placeholder="Cost"
        value={formData.cost}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="totalPages"
        type="number"
        placeholder="Total Pages"
        value={formData.totalPages}
        onChange={handleChange}
        style={inputStyle}
        
      />

      <select name="binding" value={formData.binding} onChange={handleChange}>
        <option>Paperback</option>
        <option>Hardcover</option>
        
       
      </select>

      <input
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
       style={inputStyle}
      />

      <input
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        style={inputStyle}
      
      />

      <select name="rating" value={formData.rating} onChange={handleChange}>
        <option value="">Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r}>{r}</option>
        ))}
       
      </select>

      <textarea
        name="review"
        placeholder="Your thoughts about this book..."
        value={formData.review}
        onChange={handleChange}
        style={inputStyle}
       
      />

      <label style={styles.checkbox}>
        <input
          type="checkbox"
          name="recommend"
          checked={formData.recommend}
          onChange={handleChange}
        />
        Would you recommend this book?
      </label>

      
      <button style={styles.button} type="submit">
  Save Book
</button>

    </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },

  form: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fafafa",
    padding: "26px",
    borderRadius: "18px",
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  button: {
  marginTop: "8px",
  padding: "10px",
  borderRadius: "14px",
  border: "none",
  backgroundColor: "#111",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
},


  checkbox: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "14px",
    color: "#444",
  },
};
const inputStyle = {
  padding: "10px 12px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "14px",
  fontFamily: "inherit",
};




export default BookForm;
