import React, { useState } from "react";

/**
 * Controlled/uncontrolled friendly password input with toggle.
 * - value/onChange are optional (works uncontrolled too).
 */
export default function PasswordInput({
  id = "password",
  label = "Password",
  placeholder = "Enter your password",
  inputClassName = "",
  value,
  onChange,
  name,
  showToggle = true,
  ...rest
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={
            "block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0 transition-shadow " +
            inputClassName
          }
          {...rest}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            aria-label="Toggle password visibility"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              {show ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.585 10.586A2 2 0 0113.414 13.414M9.88 9.88l-1.122-1.122M6.228 6.228C4.36 7.36 3 9 3 9s3 6 9 6c1.043 0 2.01-.145 2.892-.414M17.772 17.772C19.64 16.64 21 15 21 15s-3-6-9-6c-.53 0-1.048.034-1.552.1"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
