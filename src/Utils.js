export function capitalize(text = "") {
  const t = String(text).toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
