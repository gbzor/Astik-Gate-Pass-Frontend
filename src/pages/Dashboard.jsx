import { Link } from 'react-router'
import './Dashboard.css'

const stats = [
  { label: 'Active Stickers', value: 0 },
  { label: 'Pending Applications', value: 1 },
]

const reminders = [
  'Your application is currently under review.',
  'You will be notified via email once it’s approved.',
]

const activity = [
  {
    id: 'VG-2026-01482',
    date: 'Submitted on October 27, 2026 • 12:34 PM',
    status: 'Pending',
  },
]

export default function Dashboard() {
  return (
    <>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Check your car sticker applications and what to do next.</p>
      </header>

      <div className="dash-grid">
        {stats.map(({ label, value }) => (
          <section className="dash-card dash-stat" key={label}>
            <h2>{label}</h2>
            <p className="dash-stat-value">{value}</p>
          </section>
        ))}

        <section className="dash-card">
          <h2>Quick Actions</h2>
          <div className="dash-actions">
            <Link className="dash-action dash-action-primary" to="/vehicle-registration">
              Apply for Car Sticker
            </Link>
            <Link className="dash-action" to="/application-status">
              View Application Status
            </Link>
          </div>
        </section>

        <section className="dash-card dash-reminders">
          <h2>Important Reminders</h2>
          {reminders.length > 0 ? (
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder}>{reminder}</li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">No reminders right now.</p>
          )}
        </section>

        <section className="dash-card dash-activity">
          <h2>Recent Activity</h2>
          {activity.length > 0 ? (
            <ul>
              {activity.map(({ id, date, status }) => (
                <li key={id}>
                  <div>
                    <p className="dash-activity-title">Application #{id}</p>
                    <p className="dash-activity-date">{date}</p>
                  </div>
                  <span className="dash-status">{status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">
              No activity yet. Apply for a car sticker to get started.
            </p>
          )}
        </section>
      </div>
    </>
  )
}
