'use client'
import React from 'react';
import Link from 'next/link';
import { Play, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      return setError("All fields are required.");
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("signup_email", email);
      router.push('/verify-email');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full px-4 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[400px] animate-fade-in">
        <div className="text-center mb-4">
          <Link href="/" className="inline-flex items-center space-x-2 mb-2 group">
            <div className="bg-red-600 p-1 rounded-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
          <h2 className="text-xl font-black text-white">Create Account</h2>
          <p className="text-gray-400 text-xs">Join our community of movie lovers.</p>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-2xl border border-neutral-800/50 rounded-4xl p-6 shadow-2xl">
          <form className="space-y-3.5" onSubmit={handleSignUp}>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-1 pb-1">
              <input type="checkbox" id="terms" className="mt-1 accent-red-600 h-3 w-3 rounded" required />
              <label htmlFor="terms" className="text-[10px] text-gray-500 leading-relaxed">
                I agree to the <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm uppercase tracking-wider">Creating Account...</span>
                </>
              ) : (
                <>
                  <span className="text-sm uppercase tracking-wider">Start Discovery</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </form>

          <div className="mt-5 pt-5 border-t border-neutral-800/50 text-center">
            <p className="text-gray-500 text-[11px] font-medium">
              Already a cinephile?{' '}
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
