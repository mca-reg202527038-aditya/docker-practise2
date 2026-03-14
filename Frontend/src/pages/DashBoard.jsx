import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashBoard = () => {
  const location = useLocation(); // current URL path

  // function to check active button
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="w-full h-20 bg-zinc-200 flex items-center justify-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-4"></div>

      {/* Bottom Navigation */}
      <div className="w-full h-16 bg-white border-t fixed bottom-0 left-0 flex justify-around items-center">
        <Link
          to="/dashboard"
          className={`w-1/4 text-center py-3 font-medium ${
            isActive("/dashboard")
              ? "text-green-600 border-t-4 border-green-600"
              : "text-gray-500"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/home"
          className={`w-1/4 text-center py-3 font-medium ${
            isActive("/map")
              ? "text-green-600 border-t-4 border-green-600"
              : "text-gray-500"
          }`}
        >
          Map
        </Link>

        <Link
          to="/upload"
          className={`w-1/4 text-center py-3 font-medium ${
            isActive("/upload")
              ? "text-green-600 border-t-4 border-green-600"
              : "text-gray-500"
          }`}
        >
          Upload
        </Link>

        <Link
          to="/profile"
          className={`w-1/4 text-center py-3 font-medium ${
            isActive("/profile")
              ? "text-green-600 border-t-4 border-green-600"
              : "text-gray-500"
          }`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
