import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-[0_24px_70px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden">
        {/* Top brand bar */}
        <div className="flex items-center px-8 pt-6 pb-4 gap-2">
          <div className="h-9 w-9 rounded-2xl bg-[#e6f0ff] flex items-center justify-center">
            <div className="space-y-0.5">
              <span className="block h-[3px] w-4 rounded-full bg-[#2f80ed]" />
              <span className="block h-[3px] w-6 rounded-full bg-[#2f80ed]" />
              <span className="block h-[3px] w-5 rounded-full bg-[#2f80ed]" />
            </div>
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            JobFlow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-6 pb-6 md:px-10 md:pb-10">
          {/* LEFT: Illustration + text */}
          <div className="flex flex-col justify-center px-4 md:px-6 pb-8 md:pb-0">
            <div className="bg-[#e7f0ff] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.18)] mb-8">
              <img
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="JobFlow onboarding illustration"
                className="w-full h-[260px] md:h-[320px] object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-2">
              Start Your Journey
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-md">
              Track applications, manage interviews, and land your dream job
              with JobFlow.
            </p>
          </div>

          {/* RIGHT: Signup form */}
          <div className="flex items-center">
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                Create Your Free Account
              </h1>

              <form className="mt-8 space-y-5">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-800"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                               px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                               focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0
                               transition-shadow"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                               px-3.5 text-sm text-slate-900 placeholder:text-slate-400
                               focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0
                               transition-shadow"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-800"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                                 px-3.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400
                                 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0
                                 transition-shadow"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                      aria-label="Toggle password visibility"
                    >
                      {/* eye icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        {showPassword ? (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l18 18M10.585 10.586A2 2 0 0113.414 13.414M9.88 9.88 8.757 8.757M6.228 6.228C4.36 7.36 3 9 3 9s3 6 9 6c1.043 0 2.01-.145 2.892-.414M17.772 17.772C19.64 16.64 21 15 21 15s-3-6-9-6c-.53 0-1.048.034-1.552.1"
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
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-slate-800"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Confirm your password"
                      className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                                 px-3.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400
                                 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0
                                 transition-shadow"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                      aria-label="Toggle confirm password visibility"
                    >
                      {/* eye icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        {showConfirm ? (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l18 18M10.585 10.586A2 2 0 0113.414 13.414M9.88 9.88 8.757 8.757M6.228 6.228C4.36 7.36 3 9 3 9s3 6 9 6c1.043 0 2.01-.145 2.892-.414M17.772 17.772C19.64 16.64 21 15 21 15s-3-6-9-6c-.53 0-1.048.034-1.552.1"
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
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl
                             bg-[#2f80ed] px-4 py-2.5 text-sm font-semibold text-white
                             shadow-sm hover:bg-[#286fd0] focus:outline-none focus:ring-2
                             focus:ring-offset-0 focus:ring-[#2f80ed] transition-colors"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-5 text-xs md:text-sm text-slate-500 text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-[#2f80ed] hover:underline">
                    Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
