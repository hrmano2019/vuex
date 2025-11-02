import React from "react";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout"; // Adjust path as needed

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center self-center z-10">
        <div className="p-12 bg-white mx-auto rounded-lg w-[500px]">
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-gray-800">Login</h3>
            <p className="text-gray-500">Sign in to your account.</p>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm flex items-center space-x-2">
                <p>Don't have an account?</p>
                <Link href="/register" className="text-black font-semibold underline">
                  register
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                id="btn-submit"
                className="disabled:bg-gray-300 w-full flex justify-center bg-black text-white p-3 rounded-md tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
