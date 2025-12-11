import React from "react";

const StatusCard = ({ label, value }) => {
  return (
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192734]">
      <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
        {label}
      </p>
      <p className="text-slate-900 dark:text-white text-3xl font-bold">
        {value}
      </p>
    </div>
  );
};

export default StatusCard;
