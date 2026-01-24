
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="bg-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
          <h2 className="text-3xl font-black text-white mb-2">Reset Password</h2>
          <p className="text-gray-400">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          {!submitted ? (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    required
                    className="w-full bg-black/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20">
                <span>Send Reset Link</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Email Sent!</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                If an account exists for that email, we've sent instructions to reset your password.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-red-500 font-bold hover:text-red-400 transition-colors"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <Link href="/login" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
