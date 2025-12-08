import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

const ApplicationTable = ({ applicationDetails, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192734]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-[#8A94A6] dark:text-slate-400 uppercase tracking-wider font-medium">
            <tr>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Job Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Platform</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {applicationDetails.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                  {item.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white font-semibold">
                  {item.jobTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(item.status)}`}
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
                <td className="px-6 py-4 text-center flex justify-around items-center">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-[#8A94A6] hover:text-primary-500 transition-colors duration-200 mr-2"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="text-[#8A94A6] hover:text-red-500 transition-colors duration-200"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;
