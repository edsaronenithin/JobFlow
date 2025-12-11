import React from "react";

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
  ...rest
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={
          "block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0 transition-shadow " +
          className
        }
        {...rest}
      />
    </div>
  );
}
