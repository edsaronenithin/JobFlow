// src/pages/EmailIntegration.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const EMAIL_KEY = "jobflow_email_integration";

function readFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(EMAIL_KEY) || "null");
  } catch {
    return null;
  }
}

function writeToStorage(value) {
  try {
    localStorage.setItem(EMAIL_KEY, JSON.stringify(value));
    // broadcast in case other pages need it
    window.dispatchEvent(new CustomEvent("emailIntegrationChanged", { detail: value }));
  } catch {}
}

export default function EmailIntegration() {
  const navigate = useNavigate();
  const stored = readFromStorage();

  const [connected, setConnected] = useState(stored?.connected ?? false);
  const [accountEmail, setAccountEmail] = useState(stored?.email ?? "");
  const [lastSynced, setLastSynced] = useState(stored?.lastSynced ?? null);
  const [autoSync, setAutoSync] = useState(stored?.autoSync ?? false);
  const [testing, setTesting] = useState(false);

  // keep localStorage in sync
  useEffect(() => {
    writeToStorage({ connected, email: accountEmail, lastSynced, autoSync });
  }, [connected, accountEmail, lastSynced, autoSync]);

  // simulated connect flow
  const handleConnect = async () => {
    // In production you'd start Gmail OAuth here.
    const email = prompt("Enter Gmail address to simulate connect:", "alex.doe@gmail.com");
    if (!email) return;
    setConnected(true);
    setAccountEmail(email);
    setLastSynced(new Date().toISOString());
    // quick toast
    setTimeout(() => alert("Gmail connected (simulated)."), 100);
  };

  const handleDisconnect = () => {
    if (!confirm("Disconnect Gmail account?")) return;
    setConnected(false);
    setAccountEmail("");
    setLastSynced(null);
  };

  const handleToggleAutoSync = () => {
    setAutoSync((s) => !s);
  };

  const runTest = async () => {
    setTesting(true);
    // Simulate a short check
    await new Promise((r) => setTimeout(r, 900));
    setTesting(false);
    if (connected) {
      setLastSynced(new Date().toISOString());
      alert("Test succeeded — last synced updated.");
    } else {
      alert("No connected account found. Please connect Gmail first.");
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-text-dark-primary">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 sm:p-8 md:p-10">
   

          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl font-bold">Email Integration</h1>
              <p className="text-slate-500 dark:text-slate-400">
                Connect your email to enable semi-automated status updates for your job applications.
              </p>
            </div>

            {/* Unconnected / Connect CTA */}
            {!connected ? (
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <span className="material-symbols-outlined text-4xl text-slate-500 dark:text-slate-400">mail</span>
                </div>

                <div className="flex flex-col gap-2 max-w-xl">
                  <h3 className="text-slate-900 dark:text-white text-lg font-semibold">No Email Account Connected</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Connect your Gmail account to automatically detect replies and update application statuses.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleConnect}
                    className="flex items-center gap-2 rounded-lg h-12 px-5 bg-primary text-white font-medium hover:bg-primary/90"
                  >
                    {/* Google icon svg kept simple */}
                    <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Connect Gmail
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="rounded-lg h-12 px-5 border border-slate-200 bg-white text-sm"
                  >
                    Back to Settings
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Connected account card */}
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-4 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14" style={{ backgroundImage: `url("https://www.gravatar.com/avatar/${(accountEmail||"").trim()}?d=identicon")` }} />
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium">{accountEmail}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Last Synced: {lastSynced ? new Date(lastSynced).toLocaleString() : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={handleDisconnect} className="text-red-600 dark:text-red-400 hover:underline">Disconnect</button>
                  </div>
                </div>

                {/* Action panel: auto-sync, test */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-5">
                    <div>
                      <p className="text-slate-900 dark:text-white text-base font-semibold">Automatic Sync</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Enable background syncing of your mailbox for faster updates.</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={autoSync} onChange={handleToggleAutoSync} />
                        <div className="w-11 h-6 bg-slate-200 peer-checked:bg-primary rounded-full transition-colors" />
                        <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${autoSync ? "translate-x-5" : ""}`} />
                      </label>
                      <button onClick={runTest} disabled={testing} className="rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-sm">
                        {testing ? "Testing..." : "Run Test"}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark p-5">
                    <p className="text-slate-900 dark:text-white font-semibold">Sync Status</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      {autoSync ? "Auto sync enabled." : "Auto sync disabled. Run tests manually."}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
