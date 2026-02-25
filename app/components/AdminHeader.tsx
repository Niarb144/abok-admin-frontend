"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CiPower } from "react-icons/ci";
import { logout } from '@/app/lib/auth'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Left Side */}
          <div className="flex items-center gap-3">
            <img
              src="/Logo.png"
              className="w-10 h-auto"
              alt="Abok Logo"
            />
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Abok Admin
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <a href="/admin/dashboard" className="hover:text-[#8B4513] transition">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:text-[#8B4513] transition">
              Users
            </a>
            <button onClick={logout} className="btn cursor-pointer flex items-center gap-2">
              <CiPower className="text-white-900" />
              Logout
            </button>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">
            <a href="/admin/dashboard" className="hover:text-[#8B4513] transition">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:text-[#8B4513] transition">
              Users
            </a>
            <button onClick={logout} className="btn cursor-pointer">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
}