// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationDetails from "./pages/ApplicationDetails";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import EmailIntegration from "./pages/EmailIntegration";
import Resumes from "./pages/Resumes";
import "./fontawesome";
import { RequireAuth, RedirectIfAuth } from "./components/RouteGuards";

function App() {
  return (
    <Routes>
      {/* Smart default: go to dashboard if logged in else to login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      {/* Application details (protected) */}
      <Route
        path="/applications/:id"
        element={
          <RequireAuth>
            <ApplicationDetails />
          </RequireAuth>
        }
      />
      <Route
        path="/applications"
        element={
          <RequireAuth>
            <Applications />
          </RequireAuth>
        }
      />
      <Route
  path="/analytics"
  element={
    <RequireAuth>
      <Analytics />
    </RequireAuth>
  }
/>

     <Route
       path="/resumes"
       element={
         <RequireAuth>
           <Resumes />
         </RequireAuth>
       } />
<Route
  path="/settings"
  element={
    <RequireAuth>
      <Settings />
    </RequireAuth>
  }
/>
<Route
  path="/settings/email"
  element={
    <RequireAuth>
      <EmailIntegration />
    </RequireAuth>
  }
/>

      {/* Auth pages — redirect away if already logged in */}
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        }
      />

      {/* Fallback: catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
