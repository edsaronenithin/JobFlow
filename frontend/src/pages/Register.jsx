// import React from "react";
// import { Link } from "react-router-dom";
// import AuthLayout from "../components/auth/AuthLayout";
// import FormInput from "../components/auth/FormInput";
// import PasswordInput from "../components/auth/PasswordInput";

// export default function Register() {
//   const leftContent = (
//     <>
//       <div className="bg-[#e7f0ff] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.18)] mb-8">
//         <img
//           src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200"
//           alt="JobFlow onboarding illustration"
//           className="w-full h-[260px] md:h-[320px] object-cover"
//         />
//       </div>

//       <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-2">Start Your Journey</h2>
//       <p className="text-sm md:text-base text-slate-500 max-w-md">
//         Track applications, manage interviews, and land your dream job with JobFlow.
//       </p>
//     </>
//   );

//   const rightContent = (
//     <div className="w-full max-w-md mx-auto">
//       <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">Create Your Free Account</h1>

//       <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
//         <FormInput id="name" label="Full Name" placeholder="John Doe" required />
//         <FormInput id="email" label="Email Address" type="email" placeholder="you@example.com" required />
//         <PasswordInput id="password" label="Password" placeholder="Enter your password" />
//         <PasswordInput id="confirmPassword" label="Confirm Password" placeholder="Confirm your password" />
//         <button
//           type="submit"
//           className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#2f80ed] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#286fd0] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#2f80ed] transition-colors"
//         >
//           Create Account
//         </button>
//       </form>

//       <p className="mt-5 text-xs md:text-sm text-slate-500 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="font-medium text-[#2f80ed] hover:underline">
//           Log In
//         </Link>
//       </p>
//     </div>
//   );

//   return <AuthLayout leftContent={leftContent} rightContent={rightContent} maxWidth="max-w-6xl" />;
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // <-- use Vite env here
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Registration failed");
        setLoading(false);
        return;
      }

      // <-- ADD THIS LINE to persist auth state
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard after successful registration
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Register error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const leftContent = (
    <>
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
        Track applications, manage interviews, and land your dream job with
        JobFlow.
      </p>
    </>
  );

  const rightContent = (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
        Create Your Free Account
      </h1>

      <form className="mt-8 space-y-5" onSubmit={handleRegister}>
        <FormInput
          id="name"
          label="Full Name"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <div className="text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#2f80ed] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#286fd0] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#2f80ed] transition-colors"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-xs md:text-sm text-slate-500 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-[#2f80ed] hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );

  return (
    <AuthLayout
      leftContent={leftContent}
      rightContent={rightContent}
      maxWidth="max-w-6xl"
    />
  );
}
