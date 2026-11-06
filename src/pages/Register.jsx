import { useState } from 'react'
import { Link } from 'react-router'
import BrandPanel from '../components/BrandPanel.jsx'
import PasswordField from '../components/PasswordField.jsx'
import dotActive from '../assets/dot-active.svg'
import dotInactive from '../assets/dot-inactive.svg'
import './Auth.css'

// shortcut: BSIT is the only program named in the design, replace with the full ADNU list
const PROGRAMS = ['BSIT']
const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    program: '',
    yearLevel: '',
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
              <span className="role-option role-option-active" aria-current="true">
                <img src={dotActive} alt="" width="8" height="8" />
                Student
              </span>
              <Link className="role-option" to="/register/faculty">
                <img src={dotInactive} alt="" width="8" height="8" />
                Faculty
              </Link>
            </div>
          </div>

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
            <label htmlFor="studentId">Student ID number</label>
            <div className="input-box">
              <input
                id="studentId"
                name="studentId"
                placeholder="e.g. 2023-01234"
                required
                value={form.studentId}
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
            <div className="field">
              <label htmlFor="program">Program</label>
              <div className="input-box select-box">
                <select
                  id="program"
                  name="program"
                  required
                  value={form.program}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select program
                  </option>
                  {PROGRAMS.map((program) => (
                    <option key={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="yearLevel">Year level</label>
              <div className="input-box select-box">
                <select
                  id="yearLevel"
                  name="yearLevel"
                  required
                  value={form.yearLevel}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Select year
                  </option>
                  {YEAR_LEVELS.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
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
            Create student account
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
