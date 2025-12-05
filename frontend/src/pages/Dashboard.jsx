import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
  {
    uniqueNo: 5,
    company: "TATA",
    jobTitle: "Software Engineer",
    status: "Rejected",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
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
  {
    uniqueNo: 5,
    company: "TATA",
    jobTitle: "Software Engineer",
    status: "Rejected",
    platform: "LinkedIn",
    appliedDate: "11/01/12",
  },
];
const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "Shortlisted":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
    case "Interview":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
    case "Offered":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    case "Rejected":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    case "Referral":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300";
  }
};
const Dashboard = () => {
  const [applicationState, setApplicationState] = useState([
    { label: "Applied", value: 0 },
    { label: "Shortlisted", value: 0 },
    { label: "Interview", value: 0 },
    { label: "Offered", value: 0 },
    { label: "Rejected", value: 0 },
  ]);
  const [applicationDetails, setApplicationDetails] = useState(
    userApplicationDetails
  );
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#2C3E50] dark:text-slate-200">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#192734] p-4 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 fixed top-0 left-0 h-full w-64 inset-y-0">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className="flex gap-3 items-center px-3 pt-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="JobFlow company logo with abstract blue shapes"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtYQI8gW78ylz8ArRG5XennyKnppU6KNPnZDt9wAcy6IVkNbnhgIuO84XYMUHhFOgggGJn43F2j1A1Z14BJRA4twZYbZdU58CSMg4y6OjoVnqyETqBRtOW2J0bxMshZ2C8IgEhDkjsvHR8_HcTTEfH-FoE-J_6LXkUy0dmapRfgxXFDZqCtyld-USiB0FG0hgpErO7942HyaFIqIp4DDx1CRx-Ya-NBW5m6B5y_Izc6675jOQSBv963SAYIiz00JqpsvcQmsfxN8mr")',
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">
                  JobFlow
                </h1>
                <p className="text-[#8A94A6] dark:text-slate-400 text-sm font-normal leading-normal">
                  Application Tracker
                </p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20"
              >
                <span className="material-symbols-outlined fill">
                  dashboard
                </span>
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span className="material-symbols-outlined">view_kanban</span>
                <p className="text-sm font-medium leading-normal">
                  Kanban Board
                </p>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span className="material-symbols-outlined">description</span>
                <p className="text-sm font-medium leading-normal">Resumes</p>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span className="material-symbols-outlined">bar_chart</span>
                <p className="text-sm font-medium leading-normal">Analytics</p>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium leading-normal">Settings</p>
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <span className="material-symbols-outlined">logout</span>
              <p className="text-sm font-medium leading-normal">Logout</p>
            </a>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-[#192734]">
            <div className="flex items-center gap-8 flex-1">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Welcome back, Alex!
              </h2>
              <a
                href="#"
                className="text-primary text-sm font-medium hover:underline"
              >
                Application Portal
              </a>
            </div>

            <div className="flex flex-1 justify-end items-center gap-4">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:opacity-90">
                <span className="material-symbols-outlined fill text-lg">
                  add
                </span>
                <span className="truncate">Add Application</span>
              </button>

              <button className="p-2 text-[#8A94A6] hover:text-slate-900 dark:hover:text-white">
                <span className="material-symbols-outlined">notifications</span>
              </button>

              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="User avatar of Alex"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCBZ_qA9LkwvLEyrPilVfUmMrgAi7628j5_fOw8F0QWZMktetVk5iYHwYaqJyJ2IwYPvkU_9CmhZt8JSzdvPY6n_gEQIrCT0az0npzKTX-yqfO7LX87AXrA-ebxjC9SzVCkaln3eqC-wgDfj1xTMdl4tzUX1DBLiBd1-U17Ma0sO_Tx-v4tbOLu9GBMJf5eaEdDNQxQBhR3mggMeaPpUE6KVLGWr1AWW3HV_tYKTm3_HTiGt6l9bE8oH6m8dbm3gmzpkzmCnZAaVWU")',
                }}
              />
            </div>
          </header>

          {/* Content */}
          <div className="p-10 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-8">
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {applicationState.map((item) => (
                  <div
                    key={item.label}
                    className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192734]"
                  >
                    <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal">
                      {item.label}
                    </p>
                    <p className="text-slate-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Filters + table */}
              <div className="flex flex-col gap-6">
                {/* Filters */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="material-symbols-outlined text-[#8A94A6]">
                        search
                      </span>
                    </div>
                    <input
                      id="search"
                      type="search"
                      placeholder="Search applications..."
                      className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <select
                      defaultValue="All Status"
                      className="form-select appearance-none block w-full p-2.5 pr-8 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary"
                    >
                      <option>All Status</option>
                      <option>Applied</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Offered</option>
                      <option>Rejected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8A94A6]">
                      <span className="material-symbols-outlined text-base">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      defaultValue="All Platforms"
                      className="form-select appearance-none block w-full p-2.5 pr-8 text-sm text-slate-900 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary"
                    >
                      <option>All Platforms</option>
                      <option>LinkedIn</option>
                      <option>Indeed</option>
                      <option>Company Website</option>
                      <option>Referral</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8A94A6]">
                      <span className="material-symbols-outlined text-base">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192734]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      {/* tableHead */}
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-[#8A94A6] dark:text-slate-400 uppercase tracking-wider font-medium">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Company
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Job Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Platform
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Applied Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      {/* tableBody */}
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {applicationDetails.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                              {item.company}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                              {item.jobTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-center ${getStatusBadgeStyle(item.status)}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                              {item.platform}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                              {item.appliedDate}
                            </td>
                            {/* ACTIONS COLUMN */}
                            <td className="px-6 py-4 text-center flex justify-around items-center">
                              <button className="text-[#8A94A6] hover:text-primary-500 transition-colors duration-200 mr-2">
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                              <button className="text-[#8A94A6] hover:text-red-500 transition-colors duration-200">
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* end table */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
