// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const PROFILE_KEY = "jobflow_profile";
const THEME_KEY = "jobflow_theme";
const EMAIL_INTEGRATION_KEY = "jobflow_email_integration";

function readProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw
      ? JSON.parse(raw)
      : { name: "Alex Doe", email: "alex.doe@example.com" };
  } catch {
    return { name: "Alex Doe", email: "alex.doe@example.com" };
  }
}

function readEmailIntegration() {
  try {
    const raw = localStorage.getItem(EMAIL_INTEGRATION_KEY);
    return raw ? JSON.parse(raw) : { connected: false, email: null, lastSynced: null, autoSync: false };
  } catch {
    return { connected: false, email: null, lastSynced: null, autoSync: false };
  }
}

export default function Settings() {
  const navigate = useNavigate();

  // profile form state
  const [profile, setProfile] = useState(readProfile());
  const [saved, setSaved] = useState(false);

  // appearance state
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "dark";
    } catch {
      return false;
    }
  });

  // email integration simulated state (persisted to same key used in EmailIntegration page)
  const initialEmail = readEmailIntegration();
  const [gmailConnected, setGmailConnected] = useState(initialEmail.connected ?? false);
  const [gmailAddress, setGmailAddress] = useState(initialEmail.email ?? "");

  // effect: apply theme on mount + when dark changes
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");

    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // persist profile
  const handleSaveProfile = (e) => {
    e?.preventDefault?.();
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.warn("Save failed", err);
    }
  };

  // change password (placeholder)
  const handleChangePassword = () => {
    alert("Change password flow (placeholder). Implement your modal or redirect here.");
  };

  // connect / disconnect gmail (simulated) and persist to same key EmailIntegration reads
  const persistEmailIntegration = (payload) => {
    try {
      localStorage.setItem(EMAIL_INTEGRATION_KEY, JSON.stringify(payload));
      // broadcast for other pages
      window.dispatchEvent(new CustomEvent("emailIntegrationChanged", { detail: payload }));
    } catch {}
  };

  const handleDisconnectGmail = () => {
    if (!confirm("Disconnect Gmail?")) return;
    const payload = { connected: false, email: null, lastSynced: null, autoSync: false };
    setGmailConnected(false);
    setGmailAddress("");
    persistEmailIntegration(payload);
  };

  const handleConnectGmail = () => {
    // simulated connect (in real app you'd do OAuth)
    const entered = prompt("Enter Gmail address to simulate connect:", "alex.doe@gmail.com");
    if (!entered) return;
    const payload = { connected: true, email: entered, lastSynced: new Date().toISOString(), autoSync: false };
    setGmailConnected(true);
    setGmailAddress(entered);
    persistEmailIntegration(payload);
    alert("Gmail connected (simulated).");
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-text-dark-primary">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 sm:p-8 md:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Page Heading */}
            <div className="mb-8">
              <h1 className="text-text-light-primary dark:text-dark-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                Settings
              </h1>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
              {/* Profile Information Card */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                <div className="p-5 border-b border-border-light dark:border-border-dark">
                  <h2 className="text-text-light-primary dark:text-dark-primary text-[22px] font-bold leading-tight">
                    Profile Information
                  </h2>
                </div>

                <div className="p-5 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-text-light-primary dark:text-dark-primary text-base font-medium pb-2">
                        Name
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 rounded-lg text-text-light-primary dark:text-dark-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-14 placeholder:text-text-light-secondary p-[15px] text-base"
                        placeholder="Enter your name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </label>

                    <label className="flex flex-col">
                      <p className="text-text-light-primary dark:text-dark-primary text-base font-medium pb-2">
                        Email
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 rounded-lg text-text-light-primary dark:text-dark-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-14 placeholder:text-text-light-secondary p-[15px] text-base"
                        placeholder="Enter your email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="p-5 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="px-5 h-12 rounded-lg text-primary dark:text-primary border border-primary hover:bg-primary/10 transition-colors text-sm font-medium"
                  >
                    Change Password
                  </button>
                  <div className="flex items-center gap-3">
                    {saved && (
                      <div className="text-sm text-green-600">Saved ✓</div>
                    )}
                    <button
                      type="submit"
                      className="px-5 h-12 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Preferences */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                <div className="p-5">
                  <h2 className="text-text-light-primary dark:text-dark-primary text-[22px] font-bold">
                    Account Preferences
                  </h2>
                </div>
                <div className="p-5 border-t border-border-light dark:border-border-dark">
                  <p className="text-text-light-secondary dark:text-dark-secondary">
                    More account preferences and notification settings will be
                    available here soon.
                  </p>
                </div>
              </div>

              {/* Appearance */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                <div className="p-5 border-b border-border-light dark:border-border-dark">
                  <h2 className="text-text-light-primary dark:text-dark-primary text-[22px] font-bold">
                    Appearance
                  </h2>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-text-light-primary dark:text-dark-primary font-medium">
                      Theme
                    </h3>
                    <p className="text-text-light-secondary dark:text-dark-secondary text-sm">
                      Switch between light and dark mode.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
                      light_mode
                    </span>

                    <button
                      type="button"
                      aria-checked={dark}
                      onClick={() => setDark((d) => !d)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        dark ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                      title={dark ? "Switch to light" : "Switch to dark"}
                    >
                      <span
                        className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          dark ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>

                    <span className="material-symbols-outlined text-primary dark:text-primary">
                      dark_mode
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Integration */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark">
                <div className="p-5 border-b border-border-light dark:border-border-dark">
                  <h2 className="text-text-light-primary dark:text-dark-primary text-[22px] font-bold">
                    Email Integration
                  </h2>
                </div>
                <div className="p-5">
                  <p className="text-text-light-secondary dark:text-dark-secondary mb-4">
                    Connect your email to automatically track applications and
                    correspondence.
                  </p>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img
                          className="w-8 h-8"
                          alt="Gmail logo"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcts-NMhcWExY6oqvokxkrRO43FPX4ryz3iMIprnTs0ybNRexCJW0SE4ctrvw8VK7xbWHWAIULZTEvBxYBdNW5L6F0oE5oiY2-Vgdi7fGLoEOA1psUMm1U-5zBC00wuqOvHX35hDDoL8mQsdyr3gQV62i7ny7zWGyAf_kiJfgMHsTEMb10hbV9aOb46k9_E4PBMa59YlpEEGONUqEnQdZLQ16Q9--HZs-gm6ZN1Hqx19m4OY-NZNQLBwDmubwws3XXkBxMG1x23lNO"
                        />
                      </div>

                      <div>
                        <h4 className="font-medium text-text-light-primary dark:text-dark-primary">
                          Gmail
                        </h4>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${gmailConnected ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          <p
                            className={`${gmailConnected ? "text-green-600 dark:text-green-400" : "text-text-light-secondary dark:text-dark-secondary"} text-sm`}
                          >
                            {gmailConnected ? `Connected (${gmailAddress})` : "Not connected"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                    {gmailConnected ? (
  <button
    type="button"
    onClick={handleDisconnectGmail}
    className="
      px-5 h-12 rounded-lg 
      text-red-600 dark:text-red-400
      border border-red-600/50 dark:border-red-500/50
      bg-white dark:bg-[#1E2A36]
      hover:bg-red-500/10 
      transition-colors text-sm font-medium
    "
  >
    Disconnect
  </button>
) : (
  <button
    type="button"
    onClick={handleConnectGmail}
    className="
      px-5 h-12 rounded-lg 
      bg-primary text-white 
      hover:bg-primary/90 
      transition-colors text-sm font-medium
    "
  >
    Connect Gmail
  </button>
)}

                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-border-light dark:border-border-dark flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/settings/email")}
                    className="flex items-center justify-center gap-2 px-5 h-12 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <span className="material-symbols-outlined text-lg">email</span>
                    Open Email Integration
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
