import { Link, NavLink, Outlet } from 'react-router'
import seal from '../../assets/seal.png'
import './StudentLayout.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/vehicle-registration', label: 'Apply for Car Sticker' },
  { to: '/application-status', label: 'Application Status' },
  { to: '/campus-parking', label: 'Campus Parking' },
]

const student = { name: 'Lorenzo Paulo Tandog', idNumber: 'CO20240000' }

export default function StudentLayout() {
  return (
    <div className="student-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">
            <img src={seal} alt="" width="32" height="32" />
          </span>
          <div>
            <p className="sidebar-title">Astik GatePass</p>
            <p className="sidebar-tagline">Secure vehicle access</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} className="sidebar-link">
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-user">
          <p className="sidebar-name">{student.name}</p>
          <p className="sidebar-id">{student.idNumber}</p>
          <Link className="sidebar-signout" to="/login">
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="student-main">
        <div className="student-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
