import React, { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusCard from "../components/StatusCard";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationModal from "../components/ApplicationModal";

// sample data
const userApplicationDetails = [
  { uniqueNo: 1, company: "TATA", jobTitle: "Software Engineer", status: "Applied", platform: "LinkedIn", appliedDate: "11/01/12" },
  { uniqueNo: 2, company: "UST Global", jobTitle: "Fullstack Developer", status: "Shortlisted", platform: "Company Website", appliedDate: "21/11/12" },
  { uniqueNo: 3, company: "Infosys", jobTitle: "Web Developer", status: "Offered", platform: "LinkedIn", appliedDate: "11/01/12" },
  { uniqueNo: 4, company: "TATA", jobTitle: "Software Engineer", status: "Interview", platform: "LinkedIn", appliedDate: "11/01/12" },
  { uniqueNo: 5, company: "TATA", jobTitle: "Software Engineer", status: "Rejected", platform: "LinkedIn", appliedDate: "11/01/12" },
];

const Dashboard = () => {
  const [applicationDetails, setApplicationDetails] = useState(userApplicationDetails);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  // compute counts (memoized)
  const applicationState = useMemo(() => {
    const counts = { Applied: 0, Shortlisted: 0, Interview: 0, Offered: 0, Rejected: 0 };
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
    setApplicationDetails((prev) => prev.filter((a) => a.uniqueNo !== item.uniqueNo));
  };

  // save (add or update)
  const handleSaveApplication = (updated) => {
    if (updated.uniqueNo) {
      setApplicationDetails((prev) => prev.map((p) => (p.uniqueNo === updated.uniqueNo ? { ...p, ...updated } : p)));
    } else {
      const nextId = Math.max(0, ...applicationDetails.map((a) => a.uniqueNo || 0)) + 1;
      setApplicationDetails((prev) => [...prev, { ...updated, uniqueNo: nextId }]);
    }
    setModalOpen(false);
    setEditingApplication(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingApplication(null);
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#2C3E50] dark:text-slate-200">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64">
          <Header onAdd={handleAdd} />

          <div className="p-10 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {applicationState.map((item) => (
                  <StatusCard key={item.label} label={item.label} value={item.value} />
                ))}
              </div>

              {/* Filters (left as-is; you can make them controlled inputs later) */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="material-symbols-outlined text-[#8A94A6]">search</span>
                    </div>
                    <input id="search" type="search" placeholder="Search applications..." className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary" />
                  </div>

                  <div className="relative">
                    <select defaultValue="All Status" className="form-select appearance-none block w-full p-2.5 pr-8 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary">
                      <option>All Status</option>
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Offered</option>
                      <option>Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8A94A6]">
                      <span className="material-symbols-outlined text-base">expand_more</span>
                    </div>
                  </div>

                  <div className="relative">
                    <select defaultValue="All Platforms" className="form-select appearance-none block w-full p-2.5 pr-8 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary">
                      <option>All Platforms</option>
                      <option>LinkedIn</option>
                      <option>Indeed</option>
                      <option>Company Website</option>
                      <option>Referral</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8A94A6]">
                      <span className="material-symbols-outlined text-base">expand_more</span>
                    </div>
                  </div>
                </div>

                <ApplicationTable applicationDetails={applicationDetails} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ApplicationModal open={modalOpen} initialData={editingApplication} onClose={handleCloseModal} onSave={handleSaveApplication} />
    </div>
  );
};

export default Dashboard;
