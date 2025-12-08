// src/pages/Applications.jsx
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ApplicationModal from "../components/ApplicationModal";

const STORAGE_KEY = "jobflow_applications";

// fallback sample data (used only if localStorage empty)
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

  // Persist local changes back to storage & notify
  useEffect(() => {
    writeToStorage(applications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications]);

  const groups = useMemo(() => {
    const byStatus = { Applied: [], Shortlisted: [], Interview: [], Offered: [], Rejected: [] };
    applications.forEach((a) => {
      const key = a.status ?? "Applied";
      if (byStatus[key]) byStatus[key].push(a);
      else byStatus.Applied.push(a);
    });
    return byStatus;
  }, [applications]);

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
    setApplications((prev) => prev.filter((p) => p.uniqueNo !== item.uniqueNo));
  };

  const handleSave = (payload) => {
    if (payload.uniqueNo) {
      setApplications((prev) => prev.map((p) => (p.uniqueNo === payload.uniqueNo ? { ...p, ...payload } : p)));
    } else {
      const nextId = Math.max(0, ...applications.map((a) => a.uniqueNo || 0)) + 1;
      setApplications((prev) => [...prev, { ...payload, uniqueNo: nextId }]);
    }
    setModalOpen(false);
    setEditingItem(null);
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
          <button onClick={() => handleEdit(item)} className="text-slate-500 hover:text-slate-700">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={() => handleDelete(item)} className="text-slate-500 hover:text-red-500">
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

                <div className="relative w-full max-w-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                  </div>
                  <input className="block w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 focus:border-primary focus:ring-primary" placeholder="Search..." type="text" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                  <span className="material-symbols-outlined text-lg">tune</span>
                  <span>Filters</span>
                </button>

                <button onClick={handleAdd} className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#2b8cee] text-white text-sm font-bold">
                  <span className="material-symbols-outlined mr-2 text-lg">add</span>
                  <span className="truncate">Add Application</span>
                </button>
              </div>
            </div>

            {/* Responsive grid, prevents horizontal scrolling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Applied */}
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

              {/* Shortlisted */}
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

              {/* Interview */}
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

              {/* Offered */}
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

              {/* Rejected */}
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

      <ApplicationModal open={modalOpen} initialData={editingItem} onClose={() => { setModalOpen(false); setEditingItem(null); }} onSave={handleSave} />
    </div>
  );
}
