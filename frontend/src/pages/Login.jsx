// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", formData);

//       // Save token & user in localStorage (simple approach)
//       localStorage.setItem("jobflow_token", res.data.token);
//       localStorage.setItem("jobflow_user", JSON.stringify(res.data.user));

//       // Redirect to dashboard (we'll build later)
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err.response?.data?.message || "Something went wrong. Try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
//       <div className="w-full max-w-md bg-slate-800/80 border border-slate-700 rounded-2xl p-8 shadow-xl">
//         <h1 className="text-2xl font-semibold text-white text-center mb-2">
//           JobFlow
//         </h1>
//         <p className="text-slate-400 text-center mb-6">
//           Sign in to track your job applications.
//         </p>

//         {error && (
//           <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 px-3 py-2 text-sm text-red-300">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-slate-200 mb-1"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-slate-200 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-xs text-slate-400">
//           Don&apos;t have an account yet?{" "}
//           <span className="text-indigo-400 cursor-pointer">
//             (Register page coming soon)
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-transparent grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
        {/* LEFT: Card with form */}
        <div className="bg-light rounded-3xl rounded-tr-none rounded-br-none shadow-[0_24px_60px_rgba(15,23,42,0.12)] border border-slate-100 px-8 py-10 md:px-10 md:py-12 flex items-center">
          <div className="w-full">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-9 w-9 rounded-xl bg-[#e6f0ff] flex items-center justify-center">
                {/* Simple stacked lines icon */}
                <div className="space-y-0.5">
                  <span className="block h-[3px] w-4 rounded-full bg-[#2f80ed]" />
                  <span className="block h-[3px] w-6 rounded-full bg-[#2f80ed]" />
                  <span className="block h-[3px] w-5 rounded-full bg-[#2f80ed]" />
                </div>
              </div>
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                JobFlow
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
              Log in to JobFlow
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-500">
              Welcome back! Please enter your details.
            </p>

            {/* Form */}
            <form className="mt-8 space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-800"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/60
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
                    className="block w-full h-11 rounded-xl border border-slate-200 bg-slate-50/60
                               px-3.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400
                               focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f80ed] focus:ring-offset-0
                               transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {/* Simple eye icon */}
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
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl
                           bg-[#2f80ed] px-4 py-2.5 text-sm font-semibold text-white
                           shadow-sm hover:bg-[#286fd0] focus:outline-none focus:ring-2
                           focus:ring-offset-0 focus:ring-[#2f80ed] transition-colors"
              >
                Login
              </button>
            </form>

            {/* Footer text */}
            <p className="mt-5 text-xs md:text-sm text-slate-500 text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
                >
                    Create an account
                </Link>

            </p>
          </div>
        </div>

        {/* RIGHT: Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <div className="bg-[#e3f1f1] rounded-3xl rounded-tl-none rounded-bl-none shadow-[0_24px_70px_rgba(15,23,42,0.18)] overflow-hidden w-full h-[360px] md:h-[550px] flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxdNgwj67hXTdUePpjR6swDP7THCYPp2_1SAps8l9LHqoa0UifJfk3bICI8ZAc8XGmWUl782sYrQNS70kO99u13eGMQyBvnGZEN9Gl4FeFNRVhm2mZ5jLxmJaK8KYSsKmUNXR7wGHgJ-QUxl8wCuQJPiBq2Bw6zoWKg3mqYWrlIzal33HI0wwzK877o5EgUO-3aIOOYD2frAbXKoAqkkH9G_z2C9Tzafz0YTY7yE38jt0zZ33FIWDlxZcwVaAkluHY5XURhnu53wnK"
              alt="JobFlow calendar illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
