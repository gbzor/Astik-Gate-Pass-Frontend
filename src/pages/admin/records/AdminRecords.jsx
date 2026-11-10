import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { getApplicants } from "../../../api";
import { capitalize } from "../../../utils";
import "./AdminRecords.css";

export default function AdminRecords() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Category");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // records = approved applicants
  useEffect(() => {
    getApplicants({ status: "approved" })
      .then(setRecords)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const q = query.trim().toLowerCase();
  const rows = records.filter((a) => {
    const matchesName = a.name.toLowerCase().includes(q);
    const matchesType = category === "Category" || capitalize(a.affiliation) === category;
    return matchesName && matchesType;
  });

  return (
    <AdminLayout pageClass="page-records">
      <h1>Records</h1>

      <div className="toolbar">
        <div className="search">
          <input
            type="text"
            placeholder="Search Records"
            aria-label="Search records"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>

        <select
          className="category"
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Category</option>
          <option>Student</option>
          <option>Faculty</option>
        </select>
      </div>

      {error && <p className="status-msg error">{error}</p>}

      <section className="records-card">
        <div className="list">
          {loading && <p className="status-msg">Loading…</p>}

          {!loading && rows.length === 0 && (
            <p className="name">No approved applicants yet.</p>
          )}

          {rows.map((a) => (
            <div className="record" key={a._id}>
              <span className="name">{a.name}</span>
              <span className="type">{capitalize(a.affiliation)}</span>
              <button className="view" onClick={() => navigate(`/admin/records/${a._id}`)}>
                View
              </button>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
