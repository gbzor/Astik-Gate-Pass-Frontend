import { useState } from 'react'

export default function PasswordField({ label, name, ...inputProps }) {
  const [visible, setVisible] = useState(false)
  const action = visible ? 'Hide' : 'Show'

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="input-box">
        <input
          id={name}
          name={name}
          type={visible ? 'text' : 'password'}
          required
          {...inputProps}
        />
        <button
          type="button"
          className="show-button"
          aria-label={`${action} ${label.toLowerCase()}`}
          onClick={() => setVisible(!visible)}
        >
          {action}
        </button>
      </div>
    </div>
  )
}
