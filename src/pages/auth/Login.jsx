import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import BrandPanel from '../../components/auth/BrandPanel.jsx'
import PasswordField from '../../components/auth/PasswordField.jsx'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <BrandPanel text="Your digital pass to a safer, faster campus. Sign in to request and manage your gate passes." />

      <main className="form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <header className="form-header">
            <h1>Welcome back</h1>
            <p>Sign in with your ADNU account to manage your gate passes.</p>
          </header>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <div className="input-box">
              <input
                id="email"
                type="email"
                placeholder="name@adnu.edu.ph"
                autoComplete="username"
                autoFocus
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <PasswordField
            label="Password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="form-options">
            <label className="check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Remember me
            </label>
            <Link className="link" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>

          <div className="divider">or</div>

          <Link className="btn btn-secondary" to="/admin/login">
            Sign in as Administrator
          </Link>

          <p className="register">
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
