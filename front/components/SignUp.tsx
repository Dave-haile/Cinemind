
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignUp: React.FC = () => {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign up and redirect to verification
    router.push('/verify-email');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="bg-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
          <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join our community of movie lovers.</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-black/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

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
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 py-2">
              <input type="checkbox" id="terms" className="mt-1 accent-red-600" required />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed">
                I agree to the <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20">
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-white font-bold hover:text-red-500 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
