import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { getApplicants, updateApplicantStatus } from "../../../api";
import { capitalize, formatDateTime } from "../../../utils";
import "./AdminApplicants.css";

export default function AdminApplicants() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    getApplicants()
      .then(setApplicants)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function decide(id, status) {
    setBusyId(id);
    setError("");
    try {
      const updated = await updateApplicantStatus(id, status);
      setApplicants((list) => list.map((a) => (a._id === id ? { ...a, ...updated } : a)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  const q = query.trim().toLowerCase();
  const visible = applicants.filter((a) => a.name.toLowerCase().includes(q));

  return (
    <AdminLayout pageClass="page-applicants">
      <h1>Applicants</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search Applicants"
          aria-label="Search applicants"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </div>

      {error && <p className="status-msg error">{error}</p>}

      <section className="table-card">
        <div className="table-scroll">
          <div className="row head">
            <div className="cell">DATE/TIME</div>
            <div className="cell">NAME</div>
            <div className="cell">TYPE</div>
            <div className="cell">ACTION</div>
          </div>

          {loading && <p className="status-msg">Loading…</p>}

          {visible.map((a) => {
            const locked = a.status !== "pending" || busyId === a._id;
            return (
              <div className="row" key={a._id}>
                <div className="cell">{formatDateTime(a.createdAt || a.appliedAt)}</div>
                <div className="cell">{a.name}</div>
                <div className="cell">{capitalize(a.affiliation)}</div>
                <div className="actions">
                  <button className="btn approve" disabled={locked} onClick={() => decide(a._id, "approved")}>
                    Approve
                  </button>
                  <button className="btn reject" disabled={locked} onClick={() => decide(a._id, "rejected")}>
                    Reject
                  </button>
                  <button className="btn view" onClick={() => navigate(`/admin/applicants/${a._id}`)}>
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AdminLayout>
  );
}
