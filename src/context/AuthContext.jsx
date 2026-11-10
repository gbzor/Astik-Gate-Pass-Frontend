import { createContext, useContext, useState } from "react";
import * as api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => api.getStoredSession());

  async function login(email, password, remember) {
    const data = await api.login({ email, password });
    const next = { token: data.token, user: data.user };
    api.saveSession(next, remember);
    setSession(next);
  }

  function logout() {
    api.clearSession();
    setSession(null);
  }

  const value = {
    user: session?.user || null,
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
