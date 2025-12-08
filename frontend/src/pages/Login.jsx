import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import FormInput from "../components/auth/FormInput";
import { signInDemo } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // If redirected from protected route, go back there after login
  const redirectPath = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login (demo auth)
    signInDemo();

    // Go to dashboard
    navigate(redirectPath, { replace: true });
  };

  const leftContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-9 w-9 rounded-xl bg-[#e6f0ff] flex items-center justify-center">
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

      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
        Log in to JobFlow
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Welcome back! Please enter your details.
      </p>

      {/* 🔥 This is where handleLogin is used */}
      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <FormInput id="email" label="Email address" type="email" required placeholder="Enter your email" />

        <PasswordInput id="password" label="Password" required placeholder="Enter your password" />

        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#2f80ed] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#286fd0]"
        >
          Login
        </button>
      </form>

      <p className="mt-5 text-xs text-slate-500 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-primary hover:underline"> Create an account </Link>
      </p>
    </>
  );

  // <-- add this: right-side illustration (visible on md+)
  const rightContent = (
    <div className="bg-[#e3f1f1] rounded-3xl rounded-tl-none rounded-bl-none shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden w-full h-[360px] md:h-[550px] flex items-center justify-center">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxdNgwj67hXTdUePpjR6swDP7THCYPp2_1SAps8l9LHqoa0UifJfk3bICI8ZAc8XGmWUl782sYrQNS70kO99u13eGMQyBvnGZEN9Gl4FeFNRVhm2mZ5jLxmJaK8KYSsKmUNXR7wGHgJ-QUxl8wCuQJPiBq2Bw6zoWKg3mqYWrlIzal33HI0wwzK877o5EgUO-3aIOOYD2frAbXKoAqkkH9G_z2C9Tzafz0YTY7yE38jt0zZ33FIWDlxZcwVaAkluHY5XURhnu53wnK"
        alt="JobFlow calendar illustration"
        className="h-full w-full object-cover"
      />
    </div>
  );

  // pass rightContent into AuthLayout so it renders the image column
  return <AuthLayout leftContent={leftContent} rightContent={rightContent} />;
}
