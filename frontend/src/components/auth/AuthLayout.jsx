import React from "react";

/**
 * AuthLayout: keeps shared layout between Login/Register.
 * leftContent: any JSX (logo + headings / form)
 * rightContent: illustration (optional)
 *
 * This mirrors the grid you had, but lets pages provide content only.
 */
export default function AuthLayout({ leftContent, rightContent, maxWidth = "max-w-5xl" }) {
  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4">
      <div className={`w-full ${maxWidth} bg-transparent grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch`}>
        <div className="bg-light rounded-3xl rounded-tr-none rounded-br-none shadow-[0_24px_60px_rgba(15,23,42,0.12)] border border-slate-100 px-8 py-10 md:px-10 md:py-12 flex items-center">
          <div className="w-full">{leftContent}</div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          {rightContent || (
            <div className="bg-[#e3f1f1] rounded-3xl rounded-tl-none rounded-bl-none shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden w-full h-[360px] md:h-[550px] flex items-center justify-center">
              {/* default illustration placeholder */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
