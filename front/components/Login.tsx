
'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="bg-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
          <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Ready to find your next favorite movie?</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-black/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Password</label>
                <Link href="/forgot-password" className="text-xs font-bold text-red-500 hover:text-red-400">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20">
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-white font-bold hover:text-red-500 transition-colors">
                Sign Up for Free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
