import React from "react";
import useSignInHook from "../hooks/useSignInHook";

const SignInForm = () => {
  const { formData, handleInputChange, handleSubmit, loading, error, success } =
    useSignInHook();

  return (
    <main className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-0">
      <form 
        onSubmit={handleSubmit} 
        className="space-y-3 md:space-y-4 lg:space-y-6"
      >

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm md:text-base font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="password"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="
              mt-1 w-full 
              p-2 md:p-3 lg:p-4
              border border-gray-300 rounded-md 
              focus:ring-2 focus:ring-blue-500 outline-none
              text-sm md:text-base
            "
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm md:text-base font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            className="
              mt-1 w-full 
              p-2 md:p-3 lg:p-4
              border border-gray-300 rounded-md 
              focus:ring-2 focus:ring-blue-500 outline-none
              text-sm md:text-base
            "
          />
        </div>

        {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}
        {success && <p className="text-green-600 text-sm md:text-base">Sign-in successful!</p>}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full 
            py-2 md:py-3 lg:py-4 
            bg-[#628dec] text-white rounded-md 
            hover:bg-blue-700 
            disabled:bg-blue-300
            transition 
            text-sm md:text-base lg:text-lg cursor-pointer
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
};

export default SignInForm;
