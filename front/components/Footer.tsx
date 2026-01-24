
'use client';

import React from 'react';
import { Twitter, Instagram, Github, Play, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-red-600 p-1 rounded-lg">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">CINEMATCH</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The ultimate destination for discovery. Join millions of film enthusiasts finding their next obsession every day.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-neutral-900 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Weekly Highlights</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest reviews and trending movies in your inbox.</p>
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors pr-12"
                />
                <button className="absolute right-2 top-2 p-1.5 bg-red-600 rounded-md text-white hover:bg-red-700">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2024 CineMatch Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Settings</a>
            <a href="#" className="hover:text-white">Do Not Sell My Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
