import { MOCK_ADMIN_ACCOUNTS, MOCK_APPLICANTS } from "./mockData";
export async function api(path, options) {
  const response = await fetch(`/api${path}`, options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = !API_URL;

const AUTH_KEY = "astik_admin_session";

export function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session, remember) {
  const store = remember ? localStorage : sessionStorage;
  store.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
}

async function request(path, options = {}) {
  const token = getStoredSession()?.token;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    if (res.status === 401 && token) {
      clearSession();
      window.location.replace("/admin/login");
    }
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

const MOCK_DECISIONS_KEY = "astik_mock_decisions";
const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

function readDecisions() {
  try {
    return JSON.parse(localStorage.getItem(MOCK_DECISIONS_KEY)) || {};
  } catch {
    return {};
  }
}

function withStatus(applicant) {
  const d = readDecisions()[applicant._id];
  return { ...applicant, status: d?.status || "pending", decidedAt: d?.decidedAt || null };
}

export async function login({ email, password }) {
  if (USE_MOCK) {
    await delay();
    const e = email.trim().toLowerCase();
    const account = MOCK_ADMIN_ACCOUNTS.find((a) => a.email === e && a.password === password);
    if (!account) throw new Error("Incorrect email or password.");
    return { token: "mock-token", user: { email: account.email, name: account.name } };
  }
  return request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function getApplicants({ status } = {}) {
  if (USE_MOCK) {
    await delay();
    const all = MOCK_APPLICANTS.map(withStatus);
    return status ? all.filter((a) => a.status === status) : all;
  }
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  return request(`/applicants${qs}`);
}

export async function getApplicant(id) {
  if (USE_MOCK) {
    await delay();
    const found = MOCK_APPLICANTS.find((a) => a._id === String(id));
    if (!found) throw new Error("Applicant not found.");
    return withStatus(found);
  }
  return request(`/applicants/${id}`);
}

export async function updateApplicantStatus(id, status) {
  if (USE_MOCK) {
    await delay(100);
    const all = readDecisions();
    all[id] = { status, decidedAt: new Date().toISOString() };
    localStorage.setItem(MOCK_DECISIONS_KEY, JSON.stringify(all));
    return withStatus(MOCK_APPLICANTS.find((a) => a._id === String(id)));
  }
  return request(`/applicants/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}