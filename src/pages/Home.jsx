import { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Home() {
  const [status, setStatus] = useState('Checking backend...')

  useEffect(() => {
    api('/health')
      .then(() => setStatus('Connected to the backend.'))
      .catch(() => setStatus('Cannot reach the backend. Is it running on port 5000?'))
  }, [])

  return (
    <main>
      <h1>Astik GatePass</h1>
      <p role="status">{status}</p>
    </main>
  )
}
