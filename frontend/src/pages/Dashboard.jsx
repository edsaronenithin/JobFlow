// src/pages/Dashboard.jsx
import React, { useState, useMemo, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusCard from "../components/StatusCard";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationModal from "../components/ApplicationModal";

// storage key used app-wide
const STORAGE_KEY = "jobflow_applications";

// sample data (used only when localStorage empty)
const userApplicationDetails = [
  {
    uniqueNo: 1,
    company: "TATA",
    jobTitle: "Software Engineer",
    status: "Applied",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
  {
    uniqueNo: 2,
    company: "UST Global",
    jobTitle: "Fullstack Developer",
    status: "Shortlisted",
    platform: "Company Website",
    appliedDate: "21/11/12",
  },
  {
    uniqueNo: 3,
    company: "Infosys",
    jobTitle: "Web Developer",
    status: "Offered",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
  {
    uniqueNo: 4,
    company: "TATA",
    jobTitle: "Software Engineer",
    status: "Interview",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
  {
    uniqueNo: 5,
    company: "TATA",
    jobTitle: "Software Engineer",
    status: "Rejected",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
];

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("Failed read from storage", e);
    return null;
  }
}

export default function Dashboard() {
  const stored = readFromStorage();
  const [applicationDetails, setApplicationDetails] = useState(
    stored ?? userApplicationDetails
  );

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  // filters / search
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtersRef = useRef(null);

  // persist apps to storage when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applicationDetails));
    } catch (e) {
      console.warn("Failed to write applications to storage", e);
    }
  }, [applicationDetails]);

  // listen for updates from Details page (or other tabs)
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.applications) {
        setApplicationDetails(e.detail.applications);
      } else if (e?.detail?.action === "reload") {
        const latest = readFromStorage();
        if (latest) setApplicationDetails(latest);
      }
    };
    window.addEventListener("applicationsUpdated", handler);

    const onStorage = (ev) => {
      if (ev.key === STORAGE_KEY) {
        try {
          const parsed = JSON.parse(ev.newValue || "[]");
          setApplicationDetails(parsed);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("applicationsUpdated", handler);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // compute counts (unfiltered)
  const applicationState = useMemo(() => {
    const counts = {
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Offered: 0,
      Rejected: 0,
    };
    applicationDetails.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    });
    return [
      { label: "Applied", value: counts.Applied },
      { label: "Shortlisted", value: counts.Shortlisted },
      { label: "Interview", value: counts.Interview },
      { label: "Offered", value: counts.Offered },
      { label: "Rejected", value: counts.Rejected },
    ];
  }, [applicationDetails]);

  // derived set of platform options (for filter dropdown)
  const platformOptions = useMemo(() => {
    const s = new Set();
    applicationDetails.forEach((a) => {
      if (a.platform) s.add(a.platform);
    });
    return ["All", ...Array.from(s)];
  }, [applicationDetails]);

  // apply search + filters to produce the list shown in table and used for counts in cards if you want
  const filteredApplications = useMemo(() => {
    const q = (searchText || "").trim().toLowerCase();
    return applicationDetails.filter((a) => {
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      if (platformFilter !== "All" && a.platform !== platformFilter)
        return false;
      if (!q) return true;
      // search in company, jobTitle, platform, notes
      const hay =
        `${a.company || ""} ${a.jobTitle || ""} ${a.platform || ""} ${a.notes || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [applicationDetails, searchText, statusFilter, platformFilter]);

  // If you prefer status cards reflect filtered result counts, compute separate counts:
  const applicationStateFiltered = useMemo(() => {
    const counts = {
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Offered: 0,
      Rejected: 0,
    };
    filteredApplications.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    });
    return [
      { label: "Applied", value: counts.Applied },
      { label: "Shortlisted", value: counts.Shortlisted },
      { label: "Interview", value: counts.Interview },
      { label: "Offered", value: counts.Offered },
      { label: "Rejected", value: counts.Rejected },
    ];
  }, [filteredApplications]);

  // open modal for Add
  const handleAdd = () => {
    setEditingApplication(null);
    setModalOpen(true);
  };

  // open modal for edit
  const handleEdit = (item) => {
    setEditingApplication(item);
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    const updated = applicationDetails.filter(
      (a) => a.uniqueNo !== item.uniqueNo
    );
    setApplicationDetails(updated);
    // broadcast the change for other pages/components
    window.dispatchEvent(
      new CustomEvent("applicationsUpdated", {
        detail: { applications: updated },
      })
    );
  };

  // save (add or update)
  const handleSaveApplication = (updated) => {
    let newList;
    if (updated.uniqueNo) {
      newList = applicationDetails.map((p) =>
        p.uniqueNo === updated.uniqueNo ? { ...p, ...updated } : p
      );
    } else {
      const nextId =
        Math.max(0, ...applicationDetails.map((a) => a.uniqueNo || 0)) + 1;
      newList = [...applicationDetails, { ...updated, uniqueNo: nextId }];
    }
    setApplicationDetails(newList);
    // notify other pages
    window.dispatchEvent(
      new CustomEvent("applicationsUpdated", {
        detail: { applications: newList },
      })
    );
    setModalOpen(false);
    setEditingApplication(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingApplication(null);
  };

  // click outside to close filters dropdown
  useEffect(() => {
    function onDoc(e) {
      if (!filtersRef.current) return;
      if (!filtersRef.current.contains(e.target)) {
        setFiltersOpen(false);
      }
    }
    if (filtersOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [filtersOpen]);

  // clear filters
  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("All");
    setPlatformFilter("All");
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#2C3E50] dark:text-slate-200 min-h-screen">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64">
          <Header onAdd={handleAdd} />

          <div className="p-10 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-8">
              {/* KPI cards — show filtered counts so user sees effect of filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {applicationStateFiltered.map((item) => (
                  <StatusCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>

              {/* Top controls: Search + Filters button + Add */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="material-symbols-outlined text-[#8A94A6]">
                        search
                      </span>
                    </div>
                    <input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search applications..."
                      className="w-80 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-10 py-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Filters button */}
                  <div className="relative" ref={filtersRef}>
                    <button
                      onClick={() => setFiltersOpen((s) => !s)}
                      aria-expanded={filtersOpen}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 hover:shadow"
                      title="Open filters"
                    >
                      <span className="material-symbols-outlined">tune</span>
                      Filters
                    </button>

                    {/* Filters dropdown */}
                    {filtersOpen && (
                      <div className="absolute left-0 mt-2 w-80 z-50 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-lg">
                        <div className="flex flex-col gap-3">
                          <label className="flex flex-col text-sm">
                            <span className="text-slate-900 dark:text-white text-xs font-medium">
                              Status
                            </span>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-200 px-3 py-2"
                            >
                              <option>All</option>
                              <option>Applied</option>
                              <option>Shortlisted</option>
                              <option>Interview</option>
                              <option>Offered</option>
                              <option>Rejected</option>
                            </select>
                          </label>

                          <label className="flex flex-col text-sm">
                            <span className="text-slate-900 dark:text-white text-xs font-medium">
                              Platform
                            </span>
                            <select
                              value={platformFilter}
                              onChange={(e) =>
                                setPlatformFilter(e.target.value)
                              }
                              className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-200 px-3 py-2"
                            >
                              {platformOptions.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          </label>

                          <div className="flex items-center justify-between gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                clearFilters();
                                setFiltersOpen(false);
                              }}
                              className="text-sm text-slate-600 dark:text-slate-300 px-3 py-2 hover:underline"
                            >
                              Clear
                            </button>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setFiltersOpen(false)}
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={() => setFiltersOpen(false)}
                                className="px-3 py-2 rounded-lg bg-[#2b8cee] hover:bg-[#1f6fcc] text-white text-sm"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add Application button */}
                <div>
                  <button
                    onClick={handleAdd}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2b8cee] hover:bg-[#1f6fcc] text-white text-sm font-bold px-4 transition-all"
                    title="Add Application"
                  >
                    <span className="material-symbols-outlined text-lg">
                      add
                    </span>
                    Add Application
                  </button>
                </div>
              </div>

              {/* Table */}
              <div>
                <ApplicationTable
                  applicationDetails={filteredApplications}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ApplicationModal
        open={modalOpen}
        initialData={editingApplication}
        onClose={handleCloseModal}
        onSave={handleSaveApplication}
      />
    </div>
  );
}
