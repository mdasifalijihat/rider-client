import React from "react";
import { Outlet } from "react-router";
import authImgs from "../assets/authImage.png";
import ProFastLogo from "../pages/Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-8 md:p-12">
      {/* Header with Logo */}
      <header className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <ProFastLogo className="h-12 w-auto" />
      </header>

      {/* Main Content Area - Reversed flex direction */}
      <main className="">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-16">
          {/* Image Section - Now on RIGHT side (second in DOM) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="max-w-md">
              <img
                src={authImgs}
                alt="Authentication illustration"
                className="w-full h-auto rounded-xl shadow-xl"
              />
              <div className="mt-6 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome to Profast
                </h2>
                <p className="mt-2 text-gray-600">
                  Fast, reliable delivery services with real-time tracking
                </p>
              </div>
            </div>
          </div>

          {/* Form Section - Now on LEFT side (first in DOM) */}
          <div className="w-full lg:w-1/2 sm:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
