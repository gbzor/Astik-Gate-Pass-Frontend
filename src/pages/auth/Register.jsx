import { useState } from 'react'
import { Link } from 'react-router'
import BrandPanel from '../../components/auth/BrandPanel.jsx'
import PasswordField from '../../components/auth/PasswordField.jsx'
import dotActive from '../../assets/dot-active.svg'
import dotInactive from '../../assets/dot-inactive.svg'
import './Auth.css'

const ROLES = {
  student: {
    path: '/register',
    name: 'Student',
    idLabel: 'Student ID number',
    idPlaceholder: 'e.g. 2023-01234',
    selects: [
      {
        name: 'program',
        label: 'Program',
        placeholder: 'Select program',
        options: ['BSIT'],
      },
      {
        name: 'yearLevel',
        label: 'Year level',
        placeholder: 'Select year',
        options: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      },
    ],
  },
  faculty: {
    path: '/register/faculty',
    name: 'Faculty',
    note: 'Faculty accounts are verified by the HR Office before activation.',
    idLabel: 'Employee ID number',
    idPlaceholder: 'e.g. FAC-2019-045',
    selects: [
      {
        name: 'department',
        label: 'Department',
        placeholder: 'Select department',
        options: ['College of Computer Studies'],
      },
      {
        name: 'position',
        label: 'Position',
        placeholder: 'Select position',
        options: ['Instructor', 'Assistant Professor', 'Associate Professor', 'Professor'],
      },
    ],
  },
}

export default function Register({ role }) {
  const details = ROLES[role]
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    program: '',
    yearLevel: '',
    department: '',
    position: '',
    password: '',
    confirmPassword: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setMessage('Registration is not connected to the server yet.')
  }

  return (
    <div className="auth-page">
      <BrandPanel text="Create your account to start requesting gate passes — it only takes a minute." />

      <main className="form-panel form-panel-compact">
        <form className="auth-form auth-form-compact" onSubmit={handleSubmit}>
          <header className="form-header">
            <h1>Create your account</h1>
            <p>Choose your role, then fill in your details.</p>
          </header>

          <div className="field">
            <p className="field-label">I am registering as</p>
            <div className="role-toggle">
              {Object.entries(ROLES).map(([key, { path, name }]) =>
                key === role ? (
                  <span key={key} className="role-option role-option-active" aria-current="true">
                    <img src={dotActive} alt="" width="8" height="8" />
                    {name}
                  </span>
                ) : (
                  <Link key={key} className="role-option" to={path}>
                    <img src={dotInactive} alt="" width="8" height="8" />
                    {name}
                  </Link>
                ),
              )}
            </div>
          </div>

          {details.note && <p className="form-note">{details.note}</p>}

          <div className="field-row">
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <div className="input-box">
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="e.g. Juan"
                  autoComplete="given-name"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <div className="input-box">
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="e.g. Dela Cruz"
                  autoComplete="family-name"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="idNumber">{details.idLabel}</label>
            <div className="input-box">
              <input
                id="idNumber"
                name="idNumber"
                placeholder={details.idPlaceholder}
                required
                value={form.idNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">ADNU email address</label>
            <div className="input-box">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@adnu.edu.ph"
                autoComplete="username"
                pattern=".+@(.+\.)?adnu\.edu\.ph"
                title="Use your ADNU email address, such as name@adnu.edu.ph"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-row">
            {details.selects.map(({ name, label, placeholder, options }) => (
              <div className="field" key={name}>
                <label htmlFor={name}>{label}</label>
                <div className="input-box select-box">
                  <select
                    id={name}
                    name={name}
                    required
                    value={form[name]}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      {placeholder}
                    </option>
                    {options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="field-row">
            <PasswordField
              label="Password"
              name="password"
              placeholder="Create password"
              autoComplete="new-password"
              pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}"
              title="Use at least 8 characters with a mix of letters, numbers and symbols"
              value={form.password}
              onChange={handleChange}
            />
            <PasswordField
              label="Confirm password"
              name="confirmPassword"
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <p className="form-hint">
            Use at least 8 characters with a mix of letters, numbers &amp; symbols.
          </p>

          <label className="check">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I agree to the{' '}
              <a className="link" href="/terms" target="_blank" rel="noreferrer">
                Terms of Use
              </a>{' '}
              and{' '}
              <a className="link" href="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Create {details.name.toLowerCase()} account
          </button>

          <p className="register">
            Already have an account?{' '}
            <Link className="link" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
