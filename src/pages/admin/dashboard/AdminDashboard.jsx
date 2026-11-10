import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { useAuth } from "../../../context/AuthContext";
import { getApplicants } from "../../../api";
import { formatDateTime } from "../../../utils";
import "./AdminDashboard.css";

const ClockIcon = () => (
  <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="21" />
    <path d="M24 12v12l7 6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="21" />
    <path d="M14 25l7 7 13-14" />
  </svg>
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getApplicants()
      .then(setApplicants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const total = applicants.length;
  const approved = applicants.filter((a) => a.status === "approved").length;
  const pending = applicants.filter((a) => a.status === "pending").length;
  const activity = applicants
    .filter((a) => a.status !== "pending" && a.decidedAt)
    .sort((a, b) => new Date(b.decidedAt) - new Date(a.decidedAt))
    .slice(0, 10);

  return (
    <AdminLayout pageClass="page-dashboard">
      <header className="topbar">
        <h1>Dashboard</h1>

        <div className="profile">
          <div className="profile-text">
            <strong>{user?.name || "Name"}</strong>
            <span>Administrator</span>
          </div>
          <div className="avatar" />
        </div>
      </header>

      {error && <p className="status-msg error">{error}</p>}

      <section className="stats">
        <div className="stat">
          <div className="stat-text">
            <h2>Pending</h2>
            <p>{pending}</p>
          </div>
          <ClockIcon />
        </div>

        <div className="stat">
          <div className="stat-text">
            <h2>Approved</h2>
            <p>{approved}</p>
          </div>
          <CheckIcon />
        </div>

        <div className="stat stat-total">
          <div className="stat-text">
            <h2>Total Applicants</h2>
            <p>{total}</p>
          </div>
        </div>
      </section>

      <section className="activity">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          {!loading && activity.length === 0 && (
            <li className="activity-empty">No activity yet.</li>
          )}
          {activity.map((a) => (
            <li className="activity-item" key={a._id}>
              <span className="activity-text">
                <span className={`badge ${a.status}`}>
                  {a.status === "approved" ? "Approved" : "Rejected"}
                </span>{" "}
                {a.name}
              </span>
              <span className="activity-time">{formatDateTime(a.decidedAt)}</span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
