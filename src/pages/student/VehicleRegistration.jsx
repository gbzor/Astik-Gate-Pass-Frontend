import { useState } from 'react'
import { Link } from 'react-router'
import './VehicleRegistration.css'

const REQUIRED = 'Please complete this field.'
const SAMPLE_REFERENCE = 'VG-2026-01482'

const FIELDS = [
  { name: 'schoolId', label: 'Student / Faculty ID', placeholder: 'Enter your school ID' },
  { name: 'fullName', label: 'Full name', placeholder: 'Enter your complete name', autoComplete: 'name' },
  {
    name: 'vehicleType',
    label: 'Vehicle type',
    placeholder: 'Select vehicle type',
    options: ['Car', 'Motorcycle', 'Tricycle', 'Van', 'Other'],
  },
  {
    name: 'plateNumber',
    label: 'Plate number',
    placeholder: 'e.g. ABC 1234',
    pattern: /^[A-Za-z0-9 -]{3,15}$/,
    message: 'Use 3 to 15 letters, numbers, spaces or hyphens.',
  },
  { name: 'makeModel', label: 'Vehicle make and model', placeholder: 'e.g. Toyota Vios' },
  { name: 'color', label: 'Vehicle color', placeholder: 'e.g. White' },
  { name: 'licenseNumber', label: 'Driver’s license number', placeholder: 'Enter license number' },
  {
    name: 'contactNumber',
    label: 'Contact number',
    placeholder: '09XX XXX XXXX',
    type: 'tel',
    autoComplete: 'tel',
    pattern: /^09\d{2}[ -]?\d{3}[ -]?\d{4}$/,
    message: 'Enter an 11-digit mobile number starting with 09.',
  },
]

const UPLOADS = [
  { name: 'driversLicense', label: 'Driver’s License' },
  { name: 'officialReceipt', label: 'Official Receipt' },
  { name: 'schoolIdCopy', label: 'School ID' },
]

function findErrors(values, files) {
  const errors = {}
  for (const { name, pattern, message } of FIELDS) {
    const value = (values[name] ?? '').trim()
    if (!value) errors[name] = REQUIRED
    else if (pattern && !pattern.test(value)) errors[name] = message
  }
  for (const { name } of UPLOADS) {
    if (!files[name]) errors[name] = REQUIRED
  }
  return errors
}

export default function VehicleRegistration() {
  const [values, setValues] = useState({})
  const [files, setFiles] = useState({})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const hasErrors = Object.values(errors).some(Boolean)

  function handleChange(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  function handleFile(event) {
    const { name, files: chosen } = event.target
    setFiles({ ...files, [name]: chosen[0] })
    setErrors({ ...errors, [name]: chosen[0] ? undefined : REQUIRED })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = findErrors(values, files)
    setErrors(found)

    const [firstInvalid] = Object.keys(found)
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus()
      return
    }
    setSubmitted(true)
  }

  const errorProps = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const errorText = (name) =>
    errors[name] && (
      <p className="vr-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    )

  return (
    <div className="vr-page">
      <header className="page-header">
        <h1>Register your vehicle</h1>
        <p>Complete the required fields to submit your registration.</p>
      </header>

      {submitted ? (
        <section className="vr-card vr-success">
          <span className="vr-success-icon" aria-hidden="true">
            ✓
          </span>
          <h2>Registration submitted</h2>
          <p>Your vehicle registration has been received.</p>
          <div className="vr-reference">
            <span>Reference number</span>
            <strong>{SAMPLE_REFERENCE}</strong>
          </div>
          <p className="vr-success-note">You will be notified via email once it’s approved.</p>
          <Link className="vr-submit vr-success-link" to="/application-status">
            View application status
          </Link>
        </section>
      ) : (
        <>
          {hasErrors && (
            <div className="vr-alert" role="alert">
              <span className="vr-alert-icon" aria-hidden="true">
                !
              </span>
              <div>
                <p className="vr-alert-title">Please check the form</p>
                <p>Some required information is missing or invalid.</p>
              </div>
            </div>
          )}

          <form className="vr-card" onSubmit={handleSubmit} noValidate>
            <h2>Vehicle information</h2>
            <p className="vr-note">Fields marked with * are required.</p>

            <div className="vr-grid">
              {FIELDS.map(({ name, label, placeholder, options, type, autoComplete }) => (
                <div className={errors[name] ? 'vr-field vr-field-error' : 'vr-field'} key={name}>
                  <label htmlFor={name}>{label} *</label>
                  {options ? (
                    <select
                      id={name}
                      name={name}
                      required
                      value={values[name] ?? ''}
                      onChange={handleChange}
                      {...errorProps(name)}
                    >
                      <option value="" disabled hidden>
                        {placeholder}
                      </option>
                      {options.map((option) => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type={type ?? 'text'}
                      placeholder={placeholder}
                      autoComplete={autoComplete}
                      required
                      value={values[name] ?? ''}
                      onChange={handleChange}
                      {...errorProps(name)}
                    />
                  )}
                  {errorText(name)}
                </div>
              ))}
            </div>

            <div className="vr-uploads">
              {UPLOADS.map(({ name, label }) => (
                <div className={errors[name] ? 'vr-field vr-field-error' : 'vr-field'} key={name}>
                  <label htmlFor={name}>{label} *</label>
                  <div className="vr-upload">
                    <input
                      id={name}
                      name={name}
                      type="file"
                      accept="image/*,application/pdf"
                      required
                      onChange={handleFile}
                      {...errorProps(name)}
                    />
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                      <path d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                    </svg>
                    <span>{files[name]?.name ?? 'Choose a file'}</span>
                  </div>
                  {errorText(name)}
                </div>
              ))}
            </div>

            <div className="vr-actions">
              <button type="submit" className="vr-submit">
                Submit registration
              </button>
              {hasErrors && <p className="vr-footnote">Required fields are marked in red.</p>}
            </div>
          </form>
        </>
      )}
    </div>
  )
}
