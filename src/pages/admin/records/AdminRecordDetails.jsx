import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { InfoSection, RequirementsSection } from "../../../components/admin/DetailsSection";
import { getApplicant } from "../../../api";
import "./AdminRecordDetails.css";

export default function AdminRecordDetails() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getApplicant(id)
      .then(setApplicant)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminLayout pageClass="record-details-page">
      <header className="person">
        <div className="avatar" />
        <div className="person-text">
          <strong>{applicant ? applicant.name : "Applicant"}</strong>
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

          <section className="block">
            <div className="grid">
              <div className="item">
                <span className="req-title">Sticker Validation</span>
                <span className="value">{applicant.stickerValidation || "—"}</span>
              </div>
              <div className="item">
                <span className="req-title">Sticker Restriction</span>
                <span className="value">{applicant.stickerRestriction || "—"}</span>
              </div>
            </div>
          </section>
        </>
      )}

      <Link to="/admin/records" className="back">Back</Link>
    </AdminLayout>
  );
}
