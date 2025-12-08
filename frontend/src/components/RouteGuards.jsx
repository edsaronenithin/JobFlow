// src/components/RouteGuards.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth";

/**
 * RequireAuth
 * - Wrap private routes (Dashboard) with this.
 * - If not authenticated, redirect to /login, preserving `from`.
 */
export function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

/**
 * RedirectIfAuth
 * - Wrap public auth routes (Login/Register) with this.
 * - If already authenticated, redirect to /dashboard.
 */
export function RedirectIfAuth({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
