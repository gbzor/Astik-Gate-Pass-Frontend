import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { InfoSection, RequirementsSection } from "../../../components/admin/DetailsSection";
import { getApplicant, updateApplicantStatus } from "../../../api";
import "./AdminApplicantDetails.css";

export default function AdminApplicantDetails() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApplicant(id)
      .then(setApplicant)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function decide(status) {
    setSaving(true);
    setError("");
    try {
      const updated = await updateApplicantStatus(id, status);
      setApplicant((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const decided = applicant && applicant.status !== "pending";

  return (
    <AdminLayout pageClass="page-applicant-details">
      <header className="person">
        <div className="avatar" />
        <div className="person-text">
          <strong>{applicant ? applicant.name : "Applicant"}</strong>
          <span>Applicant</span>
        </div>
      </header>

      {loading && <p className="status-msg">Loading…</p>}
      {error && <p className="status-msg error">{error}</p>}

      {applicant && (
        <>
          <InfoSection
            title="Applicant Information"
            fields={[
              { label: "Name", value: applicant.name },
              { label: "ID Number", value: applicant.idNumber },
              { label: "Email", value: applicant.email, link: true },
              { label: "Course", value: applicant.course },
              { label: "Contact No.", value: applicant.contact },
              { label: "Affiliation", value: applicant.affiliation },
            ]}
          />

          <InfoSection
            title="Vehicle Information"
            fields={[
              { label: "Vehicle Type", value: applicant.vehicleType },
              { label: "Brand", value: applicant.brand },
              { label: "Plate No.", value: applicant.plateNo },
              { label: "Sticker restriction", value: applicant.stickerRestriction },
            ]}
          />

          <RequirementsSection requirements={applicant.requirements} />

          {decided && (
            <p
              className={`decision ${applicant.status === "approved" ? "ok" : "no"}`}
              role="status"
            >
              Application {applicant.status}.
            </p>
          )}

          <div className="decide">
            <button
              type="button"
              className="btn approve"
              disabled={decided || saving}
              onClick={() => decide("approved")}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn reject"
              disabled={decided || saving}
              onClick={() => decide("rejected")}
            >
              Reject
            </button>
          </div>
        </>
      )}

      <Link to="/admin/applicants" className="back">Back</Link>
    </AdminLayout>
  );
}
