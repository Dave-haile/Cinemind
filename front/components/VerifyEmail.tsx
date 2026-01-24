
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      alert("Email verified successfully!");
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="bg-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">CINEMATCH</span>
          </Link>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-10 shadow-2xl text-center">
          <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-red-500" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-4">Verify Your Identity</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We've sent a 6-digit verification code to your email address. Enter the code below to continue.
          </p>

          <form onSubmit={handleVerify}>
            <div className="flex justify-between gap-2 mb-10" onPaste={handlePaste}>
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 bg-black/50 border border-neutral-800 rounded-xl text-center text-xl font-black text-white focus:outline-none focus:border-red-500 transition-colors shadow-inner"
                />
              ))}
            </div>

            <div className="space-y-4">
              <button 
                type="submit"
                disabled={isVerifying || code.join('').length < 6}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Verify Account</span>
                )}
              </button>
              
              <button 
                type="button"
                className="w-full bg-neutral-800/50 hover:bg-neutral-800 text-white font-bold py-4 rounded-2xl transition-all"
              >
                Resend Code
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-neutral-800">
            <Link href="/signup" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
