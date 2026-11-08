const NONE = "—";

export function InfoSection({ title, fields }) {
  return (
    <section className="block">
      <h2>{title}</h2>
      <div className="grid">
        {fields.map((f) => (
          <div className="item" key={f.label}>
            <span className="label">{f.label}</span>
            <span className={`value${f.link ? " value-link" : ""}`}>{f.value || NONE}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const REQUIREMENTS = [
  { key: "driversLicense", title: "Driver's License" },
  { key: "officialReceipt", title: "Official Receipt" },
  { key: "schoolId", title: "School ID" },
  { key: "certificateOfRegistration", title: "Certificate of Registration" },
];

function noFile(e) {
  e.preventDefault();
  alert("No file has been uploaded for this requirement yet.");
}

export function RequirementsSection({ requirements = {} }) {
  return (
    <section className="block">
      <h2>Uploaded Requirements</h2>
      <div className="grid">
        {REQUIREMENTS.map(({ key, title }) => {
          const url = requirements[key];
          return (
            <div className="item" key={key}>
              <span className="req-title">{title}</span>
              {url ? (
                <>
                  <a className="req-link" href={url} target="_blank" rel="noreferrer">[View]</a>
                  <a className="req-link" href={url} download>[Download]</a>
                </>
              ) : (
                <>
                  <a className="req-link" href="#" onClick={noFile}>[View]</a>
                  <a className="req-link" href="#" onClick={noFile}>[Download]</a>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
