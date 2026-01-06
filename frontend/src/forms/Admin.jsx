import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useSigninAdmin from "../hooks/useSigninAdmin";

const Admin = () => {
  const [visible, setVisible] = useState(false);

  const {
    formData,
    loading,
    hasError,
    handleChange,
    handleSubmit,
  } = useSigninAdmin();

  return (
    <section
      className="w-full grid grid-cols-1 md:grid-cols-2 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: 'url("/img/munisipyo.jpg")' }}
    >
      <div className="hidden md:flex items-center px-6 h-full relative">
        <div className="absolute inset-0 bg-gray-900 opacity-90 z-0"></div>

        <div className="flex items-center gap-6 relative z-10">
          <img src="/img/logo.png" alt="Logo" className="w-24 h-24" />
          <div>
            <h2 className="text-2xl font-bold uppercase text-white">
              Municipality of Solano
            </h2>
            <span className="text-gray-300 text-sm">
              Province of Nueva Vizcaya
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-color)] min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 px-2 space-y-5"
        >
          <h2 className="text-5xl">Log In</h2>

          <div>
            <label className="text-sm font-medium">Username</label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-10 py-2 border-b ${hasError ? 'border-red-500' : ''}`}
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={visible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border-b ${hasError ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {visible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {hasError && (
            <div
              className="flex items-start gap-2 p-3 rounded-md"
              style={{
                border: `1px solid #f56565`,
                backgroundColor: `#fff5f5`
              }}
            >
              <p
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: "#f56565"
                }}
              >
                {hasError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#628dec] text-white px-6 py-2 rounded-md"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Admin;
