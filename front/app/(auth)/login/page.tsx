'use client'
import React, { useState } from 'react';
import { Play, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    router.replace("/");
  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="h-screen w-full px-6 flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="bg-red-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
          <h2 className="text-2xl font-black text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Ready to find your next favorite movie?</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-4xl p-6 md:p-8 shadow-2xl">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                {/* Fix: Removed unsupported 'size' prop from Link component */}
                <Link href="/forgot-password" className="text-[10px] font-bold text-red-500 hover:text-red-400">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-black/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {error ? (
              <div className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20 mt-2"
            >
              <span className="text-sm uppercase tracking-wider">{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
            <p className="text-gray-400 text-xs">
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
