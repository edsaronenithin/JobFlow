// src/pages/ApplicationDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ApplicationModal from "../components/ApplicationModal";

const STORAGE_KEY = "jobflow_applications";

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Failed write to storage", e);
  }
  // Notify other parts of app (Dashboard)
  window.dispatchEvent(new CustomEvent("applicationsUpdated", { detail: { applications: list } }));
}

export default function ApplicationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const idParam = params.id;

  // initial application may come via location.state for faster nav
  const [application, setApplication] = useState(location.state?.application ?? null);
  const [modalOpen, setModalOpen] = useState(false);

  // load from storage if we don't have it yet (e.g. direct URL)
  useEffect(() => {
    if (!application) {
      const apps = readFromStorage();
      const found = apps.find((a) => String(a.uniqueNo) === String(idParam));
      if (found) setApplication(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam]);

  // if still not found, show a friendly fallback and navigate back
  useEffect(() => {
    if (application === null) {
      // short delay so user sees the message
      const t = setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
      return () => clearTimeout(t);
    }
  }, [application, navigate]);

  // sample upcoming interviews & history — replace with real data source if available
  const upcomingInterviews = useMemo(
    () => [
      { id: 1, title: "Technical Screen", date: "Nov 5, 2023 - 2:00 PM EST", with: "Jane Doe, Engineering Manager" },
      { id: 2, title: "On-site Final Round", date: "Nov 12, 2023 - 10:00 AM EST", with: "Panel interview with the team" },
    ],
    []
  );

  const history = useMemo(
    () => [
      { id: 1, type: "status", label: "Interviewing", date: "October 26, 2023", variant: "yellow" },
      { id: 2, type: "status", label: "Applied", date: "October 20, 2023", variant: "purple" },
      { id: 3, type: "note", label: "Application created", date: "October 20, 2023" },
    ],
    []
  );

  if (!application) {
    return (
      <div className="min-h-screen font-display bg-page-bg text-gray-900">
        <div className="p-12 text-center">
          <p className="text-lg text-gray-700">Application not found — returning to dashboard…</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => setModalOpen(true);

  const handleDelete = () => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    const apps = readFromStorage();
    const filtered = apps.filter((a) => String(a.uniqueNo) !== String(application.uniqueNo));
    writeToStorage(filtered);
    // go back to dashboard
    navigate("/dashboard", { replace: true });
  };

  const handleSave = (updated) => {
    const apps = readFromStorage();
    let updatedList;
    if (updated.uniqueNo) {
      updatedList = apps.map((a) => (String(a.uniqueNo) === String(updated.uniqueNo) ? { ...a, ...updated } : a));
    } else {
      // add new
      const nextId = Math.max(0, ...apps.map((x) => x.uniqueNo || 0)) + 1;
      updated.uniqueNo = nextId;
      updatedList = [...apps, updated];
    }
    writeToStorage(updatedList);
    // reflect changes locally and close modal
    setApplication(updated);
    setModalOpen(false);
  };

  return (
    <div className="font-display bg-page-bg min-h-screen text-gray-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64">
          <Header />

          <div className="p-10 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl">
              {/* Back */}
              <div className="mb-6">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary">
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Back to Dashboard
                </button>
              </div>

              {/* Title & actions */}
              <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-extrabold text-gray-900">{`${application.jobTitle} at ${application.company}`}</h1>
                  <div className="flex items-center gap-2">
                    {/* Interviewing badge — exact color from palette */}
                    <span className="inline-flex items-center rounded-full bg-[#FFF8E1] text-[#C98A00] px-2.5 py-0.5 text-xs font-medium">
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    className="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-200"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined">delete</span>
                    Delete
                  </button>

                  <button
                    onClick={handleEdit}
                    className="flex h-10 items-center gap-2 rounded-lg bg-[#2B8CEE] px-4 text-sm font-semibold text-white hover:bg-[#1D75D8]"
                    title="Edit Application"
                  >
                    <span className="material-symbols-outlined">edit</span>
                    Edit Application
                  </button>
                </div>
              </div>

              {/* Main grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left column (main details) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden">
                    <div className="border-b border-card-border px-6 py-4">
                      <h2 className="text-lg font-semibold text-gray-900">Application Details</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 p-6 sm:grid-cols-2">
                      <div className="py-4">
                        <p className="text-sm font-medium text-gray-500">Platform</p>
                        <p className="mt-1 text-sm text-gray-900">{application.platform || "—"}</p>
                      </div>

                      <div className="py-4">
                        <p className="text-sm font-medium text-gray-500">Date Applied</p>
                        <p className="mt-1 text-sm text-gray-900">{application.appliedDate || "—"}</p>
                      </div>

                      <div className="py-4">
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1 text-sm text-gray-900">{application.location || "—"}</p>
                      </div>

                      <div className="py-4">
                        <p className="text-sm font-medium text-gray-500">Salary Range</p>
                        <p className="mt-1 text-sm text-gray-900">{application.salary || "—"}</p>
                      </div>

                      <div className="py-4 sm:col-span-2">
                        <p className="text-sm font-medium text-gray-500">Resume Used</p>
                        <a className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-[#2B8CEE] hover:underline" href="#">
                          <span className="material-symbols-outlined text-base text-[#2B8CEE]">description</span>
                          <span>{application.resume || "—"}</span>
                        </a>
                      </div>

                      <div className="py-4 sm:col-span-2">
                        <p className="text-sm font-medium text-gray-500">Notes</p>
                        <p className="mt-1 text-sm leading-6 text-gray-900">{application.notes || "No notes yet."}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column (interviews + history) */}
                <div className="flex flex-col gap-8">
                  <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden">
                    <div className="border-b border-card-border px-6 py-4">
                      <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-col gap-6">
                        {upcomingInterviews.map((iv) => (
                          <div key={iv.id} className="flex gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F1FF] text-[#2B8CEE]">
                              <span className="material-symbols-outlined">event</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{iv.title}</p>
                              <p className="text-sm text-gray-500 mt-1">{iv.date}</p>
                              <p className="text-sm text-gray-600 mt-1">{iv.with}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden">
                    <div className="border-b border-card-border px-6 py-4">
                      <h3 className="text-lg font-semibold text-gray-900">Application History</h3>
                    </div>
                    <div className="p-6">
                      <ol className="relative border-l border-[#E5E7EB]">
                        {history.map((h) => (
                          <li key={h.id} className="mb-6 relative pl-8">
                            <span
                              className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white ${
                                h.variant === "yellow" ? "bg-[#FFF8E1]" : h.variant === "purple" ? "bg-[#EDE9FE]" : "bg-gray-50"
                              }`}
                            >
                              <span className="material-symbols-outlined text-xs text-[#2B8CEE]">
                                {h.type === "note" ? "note_add" : "check"}
                              </span>
                            </span>

                            <h4 className="text-sm font-semibold text-gray-900">
                              {h.type === "status" ? (
                                <>
                                  Status changed to{" "}
                                  <span
                                    className={`ml-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                      h.variant === "yellow"
                                        ? "bg-[#FFF8E1] text-[#C98A00]"
                                        : h.variant === "purple"
                                        ? "bg-[#EDE9FE] text-[#6D28D9]"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {h.label}
                                  </span>
                                </>
                              ) : (
                                h.label
                              )}
                            </h4>

                            <time className="mb-2 block text-xs text-gray-400">{`on ${h.date}`}</time>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end grid */}
            </div>
          </div>
        </main>
      </div>

      {/* Reuse the ApplicationModal component for edit */}
      <ApplicationModal open={modalOpen} initialData={application} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </div>
  );
}
