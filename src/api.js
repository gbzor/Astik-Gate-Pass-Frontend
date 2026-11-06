// shortcut: relative URLs rely on the Vite proxy, add a base URL when frontend and backend are deployed separately
export async function api(path, options) {
  const response = await fetch(`/api${path}`, options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
