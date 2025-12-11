// src/auth.js
// Simple demo auth utilities — replace with real auth logic (context, tokens, api)
export const authKey = "jobflow_is_authenticated";

/** Set auth (for demo) */
export function signInDemo() {
  localStorage.setItem(authKey, "1");
}

/** Clear auth (for demo) */
export function signOut() {
  localStorage.removeItem(authKey);
}

/** Check auth */
export function isAuthenticated() {
  return localStorage.getItem(authKey) === "1";
}
