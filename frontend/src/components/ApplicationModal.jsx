// src/components/ApplicationModal.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

/**
 * Light-themed Application modal styled to match the provided screenshot.
 * Props:
 * - open (bool)
 * - initialData (object | null)
 * - onClose()
 * - onSave(updatedApplication)
 */
export default function ApplicationModal({ open, initialData, onClose, onSave }) {
  const [form, setForm] = useState({
    uniqueNo: null,
    company: "",
    jobTitle: "",
    platform: "",
    status: "",
    appliedDate: "",
    location: "",
    salary: "",
    resume: "",
    notes: "",
  });

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        uniqueNo: initialData.uniqueNo ?? null,
        company: initialData.company ?? "",
        jobTitle: initialData.jobTitle ?? "",
        platform: initialData.platform ?? "",
        status: initialData.status ?? "",
        appliedDate: initialData.appliedDate ?? "",
        location: initialData.location ?? "",
        salary: initialData.salary ?? "",
        resume: initialData.resume ?? "",
        notes: initialData.notes ?? "",
      });
    } else {
      setForm({
        uniqueNo: null,
        company: "",
        jobTitle: "",
        platform: "",
        status: "",
        appliedDate: "",
        location: "",
        salary: "",
        resume: "",
        notes: "",
      });
    }
  }, [initialData, open]);

  // lock background scroll while modal open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // keyboard: esc to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = (e) => {
    e?.preventDefault?.();
    if (!form.company.trim() || !form.jobTitle.trim()) {
      return alert("Please fill Company and Job Title.");
    }
    onSave({ ...form });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Light overlay — subtle, keeps page visible like screenshot */}
      <div
        className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-[0_10px_30px_rgba(2,6,23,0.08)] overflow-hidden max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {initialData ? "Edit Application" : "Add New Application"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {initialData ? "Update the details and save changes." : "Fill in the details below to add a new job application."}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 rounded-full p-2 text-slate-400 hover:bg-slate-100"
            title="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSave}>
            {/* Company */}
            <div className="flex flex-col">
              <label htmlFor="company" className="text-sm font-medium text-slate-700 mb-2">Company Name*</label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className="h-11 px-3 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                type="text"
              />
            </div>

            {/* Job Title */}
            <div className="flex flex-col">
              <label htmlFor="jobTitle" className="text-sm font-medium text-slate-700 mb-2">Job Title*</label>
              <input
                id="jobTitle"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Product Manager"
                className="h-11 px-3 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                type="text"
              />
            </div>

            {/* Platform */}
            <div className="flex flex-col">
              <label htmlFor="platform" className="text-sm font-medium text-slate-700 mb-2">Platform</label>
              <div className="relative">
                <select
                  id="platform"
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  className="h-11 w-full pl-3 pr-10 rounded-md border border-slate-200 bg-white text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                >
                  <option value="">Select platform</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Indeed">Indeed</option>
                  <option value="Naukri">Naukri</option>
                  <option value="Company Site">Company Site</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined">expand_more</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-slate-700 mb-2">Status</label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-11 w-full pl-3 pr-10 rounded-md border border-slate-200 bg-white text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                >
                  <option value="">Select status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offered">Offered</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Wishlist">Wishlist</option>
                  <option value="Shortlisted">Shortlisted</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined">expand_more</span>
              </div>
            </div>

            {/* Applied Date */}
            <div className="flex flex-col">
              <label htmlFor="appliedDate" className="text-sm font-medium text-slate-700 mb-2">Applied Date</label>
              <input
                id="appliedDate"
                name="appliedDate"
                type="date"
                value={form.appliedDate || ""}
                onChange={handleChange}
                className="h-11 px-3 rounded-md border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA"
                className="h-11 px-3 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                type="text"
              />
            </div>

            {/* Salary */}
            <div className="flex flex-col">
              <label htmlFor="salary" className="text-sm font-medium text-slate-700 mb-2">Salary Range</label>
              <input
                id="salary"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. $100k - $120k"
                className="h-11 px-3 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                type="text"
              />
            </div>

            {/* Resume */}
            <div className="flex flex-col">
              <label htmlFor="resume" className="text-sm font-medium text-slate-700 mb-2">Resume Used</label>
              <div className="relative">
                <select
                  id="resume"
                  name="resume"
                  value={form.resume}
                  onChange={handleChange}
                  className="h-11 w-full pl-3 pr-10 rounded-md border border-slate-200 bg-white text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
                >
                  <option value="">Select a resume</option>
                  <option value="General Tech Resume.pdf">General Tech Resume.pdf</option>
                  <option value="Project Manager Resume.pdf">Project Manager Resume.pdf</option>
                  <option value="Frontend Developer Resume.pdf">Frontend Developer Resume.pdf</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none material-symbols-outlined">expand_more</span>
              </div>
            </div>

            {/* Notes (full width) */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add any relevant notes here..."
                className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2f80ed]/25"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-[#2f80ed] text-white hover:bg-[#2b73d6] shadow-sm"
          >
            Save Application
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

ApplicationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  initialData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
