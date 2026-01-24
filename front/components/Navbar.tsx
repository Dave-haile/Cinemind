"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we are on an auth page to hide navigation links
  const isAuthPage = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
  ].includes(pathname);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isAuthPage ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-red-600 p-1.5 rounded-lg">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            CINEMATCH
          </span>
        </Link>

        {!isAuthPage && (
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <a href="#trending" className="hover:text-white transition-colors">
              Movies
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-white px-4 py-2 hover:text-red-500 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-red-600 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
