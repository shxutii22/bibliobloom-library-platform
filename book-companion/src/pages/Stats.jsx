import { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa6";

function Stats() {
  const [books, setBooks] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [booksRead, setBooksRead] = useState(0);
  const [mostExpensive, setMostExpensive] = useState(null);
  const [cheapest, setCheapest] = useState(null);

  // 🔹 Load books once
  useEffect(() => {
    const savedBooks =
      JSON.parse(localStorage.getItem("books")) || [];
    setBooks(savedBooks);
  }, []);

  // 🔹 Recalculate stats when year/books change
  useEffect(() => {
    calculateStats();
  }, [books, selectedYear]);

  function calculateStats() {
    // 📚 Books read → based on endDate
    const booksReadInYear = books.filter((book) => {
      if (!book.endDate) return false;
      return (
        new Date(book.endDate).getFullYear() === selectedYear
      );
    });

    setBooksRead(booksReadInYear.length);

    // 💰 Money spent → based on startDate
    const booksBoughtInYear = books.filter((book) => {
      if (!book.startDate || !book.cost) return false;
      return (
        new Date(book.startDate).getFullYear() === selectedYear
      );
    });

    const totalSpent = booksBoughtInYear.reduce(
      (sum, book) => sum + Number(book.cost),
      0
    );

    setYearlyTotal(totalSpent);

    // 💎 Cheapest & Most Expensive (YEAR BASED)
    if (booksBoughtInYear.length > 0) {
      const sorted = [...booksBoughtInYear].sort(
        (a, b) => a.cost - b.cost
      );
      setCheapest(sorted[0]);
      setMostExpensive(sorted[sorted.length - 1]);
    } else {
      setCheapest(null);
      setMostExpensive(null);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Reading Stats <FaChartLine />
      </h2>

      {/* 🔹 Year Filter */}
      <div style={styles.filters}>
        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(Number(e.target.value))
          }
        >
          {[2023, 2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Stats */}
      <div style={styles.grid}>
        <StatCard
          label={`Books read in ${selectedYear}`}
          value={booksRead}
        />

        <StatCard
          label={`Total spent in ${selectedYear}`}
          value={`₹${yearlyTotal}`}
        />

        <StatCard
          label="Most expensive book"
          value={
            mostExpensive
              ? `${mostExpensive.title} (₹${mostExpensive.cost})`
              : "N/A"
          }
        />

        <StatCard
          label="Cheapest book"
          value={
            cheapest
              ? `${cheapest.title} (₹${cheapest.cost})`
              : "N/A"
          }
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{label}</p>
      <h3 style={styles.value}>{value}</h3>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 60px",
    backgroundColor: "#f1f3f5",
    minHeight: "100vh",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  filters: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
  },

  label: {
    fontSize: "16px",
    color: "#777",
    marginBottom: "8px",
  },

  value: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
};

export default Stats;
