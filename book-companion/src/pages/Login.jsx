import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      console.log("JWT Token:", token);

      localStorage.setItem("token", token);
       // ✅ UPDATE AUTH STATE
      setIsAuth(true);

      // redirect to home after login
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT IMAGE */}
      <div style={styles.left}>
        <img
          src="/login.png"   // put image in public/login.png
          alt="Login illustration"
          style={styles.image}
        />
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <h2 style={styles.title}>Welcome back !</h2>
        <p style={styles.subtitle}>
          Log in to continue your reading journey.
        </p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f3f5",
    padding: "40px",
    gap: "60px",
    flexWrap: "wrap",
  },

  left: {
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

  right: {
    flex: "1",
    maxWidth: "420px",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "24px",
    lineHeight: "1.6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;
