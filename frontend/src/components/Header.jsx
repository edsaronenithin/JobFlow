import React from "react";

const Header = ({ onAdd }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-[#192734]">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-[-0.015em]">
          Welcome back, Alex!
        </h2>
        <a href="#" className="text-primary text-sm font-medium hover:underline">
          Application Portal
        </a>
      </div>

      <div className="flex flex-1 justify-end items-center gap-4">
        <button
          onClick={onAdd}
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold px-4 hover:opacity-90"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="truncate">Add Application</span>
        </button>

        <button className="p-2 text-[#8A94A6] hover:text-slate-900 dark:hover:text-white">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 w-10 h-10"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCBZ_qA9LkwvLEyrPilVfUmMrgAi7628j5_fOw8F0QWZMktetVk5iYHwYaqJyJ2IwYPvkU_9CmhZt8JSzdvPY6n_gEQIrCT0az0npzKTX-yqfO7LX87AXrA-ebxjC9SzVCkaln3eqC-wgDfj1xTMdl4tzUX1DBLiBd1-U17Ma0sO_Tx-v4tbOLu9GBMJf5eaEdDNQxQBhR3mggMeaPpUE6KVLGWr1AWW3HV_tYKTm3_HTiGt6l9bE8oH6m8dbm3gmzpkzmCnZAaVWU")',
          }}
          aria-hidden
        />
      </div>
    </header>
  );
};

export default Header;
