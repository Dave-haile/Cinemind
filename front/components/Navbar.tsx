"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Film } from "lucide-react";
import { GetUser } from "@/lib/getUser";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = GetUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh(); // Refresh client-side state
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || user ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-red-600 p-1.5 rounded-lg">
            <Film className="w-5 h-5 text-[hsl(0_0%_98%)] " />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            CINEMATCH
          </span>
        </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/movies" className="hover:text-white transition-colors">
              Browse
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              Genres
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              New Releases
            </Link>
            {user && (
              <Link href="#features" className="hover:text-white transition-colors">
                My List
              </Link>
            )}
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </div>

        <div className="flex items-center space-x-4">
          {
            user ? (
              <Link
                href="/profile"
                className="text-sm font-semibold text-white px-4 py-2 hover:text-red-500 transition-colors"
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold text-white px-4 py-2 hover:text-red-500 transition-colors"
              >
                Sign In
              </Link>
            )
          }
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              Sign Out
            </button>
          )}
          {!user && (
            <Link
              href="/signup"
              className="bg-red-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
