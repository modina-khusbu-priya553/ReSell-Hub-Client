'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  

  const handleRegister = async(e) => {
     e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name, // required
      email: user.email, // required
      password: user.password, // required
      image: user.image,
      phone: user.phone,
      location: user.location
    });
    console.log("signup",user)
    console.log(data, error)

    

    if (data) {
        router.push("/");
      router.refresh();
    }
    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignup = async() => {
       const data = await authClient.signIn.social({
                provider: "google",
                
            });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/30">
            <svg className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4.9M20 15a8 8 0 01-14 4.9" />
            </svg>
          </div>
          <p className="text-xl font-bold text-white">
            ReSell<span className="text-teal-400">Hub</span>
          </p>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Give your items <br /> a second life. <br /> Start today.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Create a free account to start buying pre-owned treasures or
            listing your own items for sale.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {['Verified buyers & sellers', 'Secure Stripe payments', 'Zero listing fees'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                <svg className="h-4 w-4 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <svg className="h-7 w-7 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4.9M20 15a8 8 0 01-14 4.9" />
            </svg>
            <p className="text-lg font-bold text-slate-800">
              ReSell<span className="text-teal-700">Hub</span>
            </p>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Join ReSellHub and start buying or selling in minutes.
          </p>

          <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-4">
            {/* I want to */}
            {/* <div>
              <label className="text-sm font-medium text-slate-700">I want to</label>
              <div className="mt-1.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('buyer')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                    formData.role === 'buyer'
                      ? 'border-teal-600 bg-teal-50 text-teal-700 ring-1 ring-teal-600'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Buy Products
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('seller')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                    formData.role === 'seller'
                      ? 'border-teal-600 bg-teal-50 text-teal-700 ring-1 ring-teal-600'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Sell Products
                </button>
              </div>
            </div> */}

            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Md. Rakib Hasan"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880 1712-345678"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                />
              </div>
              <div>
                <label htmlFor="location" className="text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Dhaka, Bangladesh"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="text-sm font-medium text-slate-700">
                Photo URL <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-11 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-teal-700 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Create Account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.02h3.89c2.27-2.09 3.58-5.17 3.58-8.84z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.94H1.27v3.11C3.25 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.29a7.18 7.18 0 010-4.58V6.6H1.27a11.98 11.98 0 000 10.8l4.01-3.11z"/>
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4.01 3.11C6.23 6.86 8.88 4.75 12 4.75z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-800">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;