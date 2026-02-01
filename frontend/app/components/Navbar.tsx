"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { LogOut, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg border-b border-purple-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskApp</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-white/90">
                  Welcome,{" "}
                  <span className="font-semibold text-white">
                    {user.email}
                  </span>
                </span>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium transition-colors text-sm border border-white/30"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-white font-medium transition-colors text-sm hover:text-white/80 border-b-2 border-transparent hover:border-white/50"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-white text-purple-600 hover:bg-white/90 font-medium transition-colors text-sm shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
