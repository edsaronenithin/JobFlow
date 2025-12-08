import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    signOut();

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-[#192734] p-4 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 fixed top-0 left-0 h-full">
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex gap-3 items-center px-3 pt-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtYQI8gW78ylz8ArRG5XennyKnppU6KNPnZDt9wAcy6IVkNbnhgIuO84XYMUHhFOgggGJn43F2j1A1Z14BJRA4twZYbZdU58CSMg4y6OjoVnqyETqBRtOW2J0bxMshZ2C8IgEhDkjsvHR8_HcTTEfH-FoE-J_6LXkUy0dmapRfgxXFDZqCtyld-USiB0FG0hgpErO7942HyaFIqIp4DDx1CRx-Ya-NBW5m6B5y_Izc6675jOQSBv963SAYIiz00JqpsvcQmsfxN8mr")',
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-base font-bold">
              JobFlow
            </h1>
            <p className="text-[#8A94A6] dark:text-slate-400 text-sm">
              Application Tracker
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20"
          >
            <span className="material-symbols-outlined fill">dashboard</span>
            <p className="text-sm font-medium">Dashboard</p>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="material-symbols-outlined">view_kanban</span>
            <p className="text-sm font-medium">Kanban Board</p>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="material-symbols-outlined">description</span>
            <p className="text-sm font-medium">Resumes</p>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <p className="text-sm font-medium">Analytics</p>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <span className="material-symbols-outlined">settings</span>
            <p className="text-sm font-medium">Settings</p>
          </a>
        </nav>
      </div>

      {/* 🔥 Logout button */}
      <div className="flex flex-col gap-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-[#8A94A6] 
                     hover:bg-slate-100 dark:hover:bg-slate-800 
                     rounded-lg w-full text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium">Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
