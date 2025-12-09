// src/pages/Applications.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ApplicationModal from "../components/ApplicationModal";

const STORAGE_KEY = "jobflow_applications";

const sampleApplications = [
  { uniqueNo: 1, jobTitle: "Senior Product Designer", company: "Innovate Inc.", platform: "LinkedIn", appliedDate: "Oct 26, 2023", status: "Applied", notes: "", resume: "Designer_Resume.pdf", location: "Remote", salary: "$120k" },
  { uniqueNo: 2, jobTitle: "Full-Stack Engineer", company: "Tech Solutions", platform: "Company Website", appliedDate: "Oct 24, 2023", status: "Applied", notes: "", resume: "Fullstack_Resume.pdf", location: "", salary: "" },
  { uniqueNo: 3, jobTitle: "Product Manager", company: "Creative Minds", platform: "LinkedIn", appliedDate: "Oct 20, 2023", status: "Shortlisted", notes: "", resume: "PM_Resume.pdf", location: "", salary: "" },
  { uniqueNo: 4, jobTitle: "Lead Backend Engineer", company: "NextGen Systems", platform: "AngelList", appliedDate: "Oct 18, 2023", status: "Interview", notes: "", resume: "Backend_Resume.pdf", location: "", salary: "" },
  { uniqueNo: 5, jobTitle: "Marketing Director", company: "Growth Co.", platform: "Company Website", appliedDate: "Oct 12, 2023", status: "Offered", notes: "", resume: "Marketing_Resume.pdf", location: "", salary: "" },
  { uniqueNo: 6, jobTitle: "Content Strategist", company: "Digital Narratives", platform: "LinkedIn", appliedDate: "Oct 10, 2023", status: "Rejected", notes: "", resume: "Content_Resume.pdf", location: "", salary: "" },
];

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeToStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Failed write to storage", e);
  }
  window.dispatchEvent(new CustomEvent("applicationsUpdated", { detail: { applications: list } }));
}

export default function Applications() {
  const stored = readFromStorage();
  const [applications, setApplications] = useState(stored ?? sampleApplications);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // FILTERS (moved into a panel)
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  // filter panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const filterButtonRef = useRef(null);

  // keep storage in sync & broadcast
  useEffect(() => {
    writeToStorage(applications);
  }, [applications]);

  // listen for external updates (other pages / tabs)
  useEffect(() => {
    const onAppsUpdated = (e) => {
      if (e?.detail?.applications) setApplications(e.detail.applications);
      else {
        const latest = readFromStorage();
        if (latest) setApplications(latest);
      }
    };
    window.addEventListener("applicationsUpdated", onAppsUpdated);

    const onStorage = (ev) => {
      if (ev.key === STORAGE_KEY) {
        try {
          const parsed = JSON.parse(ev.newValue || "[]");
          setApplications(parsed);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("applicationsUpdated", onAppsUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Close panel on outside click or Esc
  useEffect(() => {
    function handleClickOutside(e) {
      if (!panelOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target) && !filterButtonRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setPanelOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [panelOpen]);

  // gather platforms for filter dropdown
  const platformOptions = useMemo(() => {
    const set = new Set(applications.map((a) => (a.platform || "Unknown").trim()));
    return ["All", ...Array.from(set)];
  }, [applications]);

  // compute filtered results and group by status
  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matches = (a) => {
      if (q) {
        const matchText = `${a.jobTitle} ${a.company} ${a.notes || ""}`.toLowerCase();
        if (!matchText.includes(q)) return false;
      }
      if (selectedStatus !== "All" && (a.status || "Applied") !== selectedStatus) return false;
      if (selectedPlatform !== "All" && ((a.platform || "").trim() || "Unknown") !== selectedPlatform) return false;
      return true;
    };

    const byStatus = { Applied: [], Shortlisted: [], Interview: [], Offered: [], Rejected: [] };
    applications.forEach((a) => {
      if (!matches(a)) return;
      const key = a.status ?? "Applied";
      if (byStatus[key]) byStatus[key].push(a);
      else byStatus.Applied.push(a);
    });
    return byStatus;
  }, [applications, search, selectedStatus, selectedPlatform]);

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (item) => {
    if (!confirm("Delete this application?")) return;
    setApplications((prev) => {
      const next = prev.filter((p) => p.uniqueNo !== item.uniqueNo);
      window.dispatchEvent(new CustomEvent("applicationsUpdated", { detail: { applications: next } }));
      return next;
    });
  };

  const handleSave = (payload) => {
    if (payload.uniqueNo) {
      setApplications((prev) => {
        const next = prev.map((p) => (p.uniqueNo === payload.uniqueNo ? { ...p, ...payload } : p));
        window.dispatchEvent(new CustomEvent("applicationsUpdated", { detail: { applications: next } }));
        return next;
      });
    } else {
      setApplications((prev) => {
        const nextId = Math.max(0, ...prev.map((a) => a.uniqueNo || 0)) + 1;
        const next = [...prev, { ...payload, uniqueNo: nextId }];
        window.dispatchEvent(new CustomEvent("applicationsUpdated", { detail: { applications: next } }));
        return next;
      });
    }
    setModalOpen(false);
    setEditingItem(null);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedStatus("All");
    setSelectedPlatform("All");
  };

  const applyAndClose = () => {
    setPanelOpen(false);
  };

  const Card = ({ item }) => (
    <div className="cursor-grab rounded-lg bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex justify-between">
        <div>
          <p className="text-slate-900 text-base font-semibold leading-tight">{item.jobTitle}</p>
          <p className="text-slate-500 text-sm mt-1">{item.company}</p>
          <p className="text-xs text-slate-400 mt-2">Applied via {item.platform || "—"}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-slate-400">{item.appliedDate}</div>
          <div className="flex items-center gap-1">
            <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
              item.status === "Applied" ? "bg-blue-100 text-blue-600" :
              item.status === "Shortlisted" ? "bg-purple-100 text-purple-600" :
              item.status === "Interview" ? "bg-orange-100 text-orange-600" :
              item.status === "Offered" ? "bg-green-100 text-green-600" :
              "bg-red-100 text-red-600"
            }`}>
              {item.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-400">{item.appliedDate}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(item)} className="text-slate-500 hover:text-slate-700" title="Edit">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={() => handleDelete(item)} className="text-slate-500 hover:text-red-500" title="Delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-display bg-background-light min-h-screen text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64">
          <Header />

          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-slate-900 text-2xl font-bold">Applications</h1>
              </div>

              <div className="flex items-center gap-3 relative">
                {/* Filters button (opens panel) */}
                <div className="relative">
                  <button
                    ref={filterButtonRef}
                    onClick={() => setPanelOpen((s) => !s)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
                    aria-expanded={panelOpen}
                    aria-controls="applications-filter-panel"
                  >
                    <span className="material-symbols-outlined text-lg">tune</span>
                    Filters
                  </button>

                  {/* Panel */}
                  {panelOpen && (
                    <div
                      id="applications-filter-panel"
                      ref={panelRef}
                      role="dialog"
                      aria-modal="false"
                      className="absolute right-0 z-40 mt-2 w-[360px] rounded-lg border border-slate-200 bg-white shadow-lg p-4"
                    >
                      <div className="flex flex-col gap-3">
                        <label className="flex flex-col">
                          <span className="text-sm text-slate-700 font-medium">Search</span>
                          <input
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search job title, company..."
                            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                          />
                        </label>

                        <label className="flex flex-col">
                          <span className="text-sm text-slate-700 font-medium">Status</span>
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          >
                            <option>All</option>
                            <option>Applied</option>
                            <option>Shortlisted</option>
                            <option>Interview</option>
                            <option>Offered</option>
                            <option>Rejected</option>
                          </select>
                        </label>

                        <label className="flex flex-col">
                          <span className="text-sm text-slate-700 font-medium">Platform</span>
                          <select
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          >
                            {platformOptions.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </label>

                        <div className="flex items-center justify-between gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => { resetFilters(); setPanelOpen(false); }}
                            className="px-3 py-2 rounded-lg text-sm border border-slate-200 bg-white"
                          >
                            Reset
                          </button>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => { applyAndClose(); }}
                              className="px-3 py-2 rounded-lg bg-primary text-white text-sm"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add button */}
                <button onClick={handleAdd} className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#2b8cee] text-white text-sm font-bold">
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  <span className="truncate">Add Application</span>
                </button>
              </div>
            </div>

            {/* Kanban-like columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="flex flex-col rounded-xl bg-[#f1f2f4] p-3">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                    <h3 className="text-slate-900 text-base font-semibold">Applied</h3>
                  </div>
                  <span className="text-slate-500 text-sm">{groups.Applied.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {groups.Applied.map((app) => <Card key={app.uniqueNo} item={app} />)}
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#f1f2f4] p-3">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-purple-500" />
                    <h3 className="text-slate-900 text-base font-semibold">Shortlisted</h3>
                  </div>
                  <span className="text-slate-500 text-sm">{groups.Shortlisted.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {groups.Shortlisted.map((app) => <Card key={app.uniqueNo} item={app} />)}
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#f1f2f4] p-3">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-orange-500" />
                    <h3 className="text-slate-900 text-base font-semibold">Interview</h3>
                  </div>
                  <span className="text-slate-500 text-sm">{groups.Interview.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {groups.Interview.map((app) => <Card key={app.uniqueNo} item={app} />)}
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#f1f2f4] p-3">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <h3 className="text-slate-900 text-base font-semibold">Offered</h3>
                  </div>
                  <span className="text-slate-500 text-sm">{groups.Offered.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {groups.Offered.map((app) => <Card key={app.uniqueNo} item={app} />)}
                </div>
              </div>

              <div className="flex flex-col rounded-xl bg-[#f1f2f4] p-3">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <h3 className="text-slate-900 text-base font-semibold">Rejected</h3>
                  </div>
                  <span className="text-slate-500 text-sm">{groups.Rejected.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {groups.Rejected.map((app) => <Card key={app.uniqueNo} item={app} />)}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ApplicationModal
        open={modalOpen}
        initialData={editingItem}
        onClose={() => { setModalOpen(false); setEditingItem(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
