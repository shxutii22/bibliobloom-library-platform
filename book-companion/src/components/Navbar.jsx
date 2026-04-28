import { NavLink, useNavigate } from "react-router-dom";
import { FaBookReader, FaPlus } from "react-icons/fa";

function Navbar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("books"); 
localStorage.removeItem("tbr");
  // 👈 clear cached data
  setIsAuth(false);
  navigate("/login");
};


  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <FaBookReader style={{ marginRight: "8px" }} />
        Biblio <strong>Bloom</strong>
      </h2>

      <div style={styles.links}>
        {isAuth ? (
          <>
            <NavLink to="/" style={styles.link}>
              Home
            </NavLink>

            <NavLink to="/tbr" style={styles.link}>
              TBR
            </NavLink>

            <NavLink to="/stats" style={styles.link}>
              Stats
            </NavLink>

            <NavLink to="/add" style={styles.addBtn}>
              <FaPlus /> Add Book
            </NavLink>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" style={styles.loginBtn}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #eee",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    fontSize: "20px",
    letterSpacing: "0.2px",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#444",
    fontSize: "15px",
    fontWeight: "400",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "14px",
  },
  loginBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: "#111",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
  },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#eee",
    color: "#333",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
