"use client";

import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  Home,
  Users,
  FileText,
  DollarSign,
  Tool,
  Search,
  LogOut,
} from "react-feather";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useUser();
  const location = useLocation();

  const getLandlordNavItems = () => [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/landlord/dashboard",
    },
    {
      icon: <Home size={20} />,
      label: "Properties",
      path: "/landlord/add-property",
    },
    {
      icon: <Users size={20} />,
      label: "Tenants",
      path: "/landlord/applications",
    },
    { icon: <DollarSign size={20} />, label: "Rent", path: "/landlord/rent" },
    {
      icon: <Tool size={20} />,
      label: "Maintenance",
      path: "/landlord/maintenance",
    },
  ];

  const getTenantNavItems = () => [
    { icon: <Home size={20} />, label: "Dashboard", path: "/tenant/dashboard" },
    {
      icon: <Search size={20} />,
      label: "Find Property",
      path: "/tenant/search",
    },
    { icon: <DollarSign size={20} />, label: "Rent", path: "/tenant/rent" },
    {
      icon: <Tool size={20} />,
      label: "Maintenance",
      path: "/tenant/maintenance",
    },
  ];

  const getLegalNavItems = () => [
    { icon: <Home size={20} />, label: "Dashboard", path: "/legal/dashboard" },
    { icon: <FileText size={20} />, label: "Cases", path: "/legal/cases" },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case "landlord":
        return getLandlordNavItems();
      case "tenant":
        return getTenantNavItems();
      case "legal":
        return getLegalNavItems();
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-blue-600">
                  NRI Rental Manager
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {getNavItems().map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <div className="mr-3">{item.icon}</div>
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around">
          {getNavItems()
            .slice(0, 5)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-600"
                } flex flex-col items-center py-2 px-3`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none pb-16 md:pb-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
