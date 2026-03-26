"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CiPower } from "react-icons/ci";
import { logout } from '@/app/lib/auth'

export default function AdminNavbar({ openSidebar }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="bg-white md:w-[80vw] md:ml-28 border-b sm:w-full shadow-sm sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Left Side */}
          <div className="flex items-center gap-3">
            
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <a href="/admin/" className="hover:text-[#8B4513] transition">
              Dashboard
            </a>
            {/* <a href="/admin/users" className="hover:text-[#8B4513] transition">
              Users
            </a> */}
            <button onClick={logout} className="btn cursor-pointer flex items-center gap-2">
              <CiPower className="text-white-900" />
              Logout
            </button>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={openSidebar}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

    </header>
  );
}