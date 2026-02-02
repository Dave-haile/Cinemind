'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, ArrowLeft, ShieldCheck } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { ApiError } from '@/types/api';

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const signupEmail = localStorage.getItem('signup_email');
    if (signupEmail) {
      setEmail(signupEmail);
    } else {
      // If no email in localStorage, redirect to signup
      router.push('/signup');
    }
  }, [router]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newCode = [...code];
    newCode[index] = element.value.substring(element.value.length - 1);
    setCode(newCode);

    // Focus next input
    if (element.value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newCode = [...code];
    pastedData.forEach((char, index) => {
      if (!isNaN(Number(char))) {
        newCode[index] = char;
      }
    });
    setCode(newCode);
    // Focus the last filled or next empty input
    const nextIndex = Math.min(pastedData.length, 5);
    inputs.current[nextIndex]?.focus();
  };

  const handleResendCode = async () => {
    setError(null);
    setSuccess(null);
    setIsResending(true);

    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setSuccess('New verification code sent to your email!');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to resend code. Please try again.');
      } else {
        setError('Failed to resend code. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccess('Email verified successfully! Account created.');
      localStorage.removeItem('signup_email');

      // Redirect to login page after successful verification
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Verification failed. Please try again.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="h-screen w-full px-4 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[400px] animate-fade-in">
        <div className="text-center mb-5">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4 group">
            <div className="bg-red-600 p-1 rounded-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-2xl border border-neutral-800/50 rounded-[2.5rem] p-7 md:p-8 shadow-2xl text-center">
          <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-xl font-black text-white mb-1.5">Verify Account</h2>
          <p className="text-gray-400 text-[11px] mb-4 leading-relaxed px-4">
            We sent a code to {email}. Enter it below to unlock your experience.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-xs">{success}</p>
            </div>
          )}

          <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-1.5 mb-6" onPaste={handlePaste}>
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => { inputs.current[index] = el; }}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-11 bg-black/40 border border-neutral-800 rounded-xl text-center text-lg font-black text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner"
                />
              ))}
            </div>

            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={isVerifying || code.join('').length < 6}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center"
              >
                {isVerifying ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="text-sm uppercase tracking-wider">Confirm Code</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="w-full text-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold py-1 text-[10px] uppercase tracking-widest transition-all"
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>
          </form>

          <div className="mt-7 pt-6 border-t border-neutral-800/50">
            <Link href="/signup" className="inline-flex items-center space-x-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Registration</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
