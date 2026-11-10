import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

const SEAL_URL = "https://www.adnu.edu.ph/wp-content/uploads/2014/03/AdNU-Seal-1.png";
export default function AdminLayout({ pageClass = "", children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleSignout(e) {
    e.preventDefault();
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="layout">
      <aside className="admin-sidebar">
        <div className="brand">
          <img src={SEAL_URL} alt="Ateneo de Naga University seal" />
          <span>Astik GatePass</span>
        </div>

        <nav className="nav">
          <NavLink to="/admin/dashboard" className="nav-btn">Dashboard</NavLink>
          <NavLink to="/admin/applicants" className="nav-btn">Applicants</NavLink>
          <NavLink to="/admin/records" className="nav-btn">Records</NavLink>
          <a href="#" className="nav-btn" onClick={(e) => e.preventDefault()}>
            Campus Parking
          </a>
        </nav>

        <a href="#" className="signout" onClick={handleSignout}>Signout</a>
      </aside>

      <main className={`main ${pageClass}`}>{children}</main>
    </div>
  );
}
