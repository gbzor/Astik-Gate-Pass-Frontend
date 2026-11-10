import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "./AdminLogin.css";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password, remember);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Incorrect email or password.");
      setPassword("");
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <main className="card">
        <div className="logo">
          <img
            src="https://www.adnu.edu.ph/wp-content/uploads/2014/03/AdNU-Seal-1.png"
            alt="Ateneo de Naga University seal"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>

        <p className="school">Ateneo de Naga University</p>
        <h1>Astik GatePass</h1>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="error" role="alert">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@adnu.edu.ph"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </div>
  );
}
