'use client';

import { postUser } from '@/actions/server/auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleRegister = async (e) => {
  e.preventDefault();

  // Password validation
  if (password.length < 6) return setError("Password must be at least 6 characters");
  if (!/[A-Z]/.test(password)) return setError("Password must contain at least 1 uppercase letter");
  if (!/[a-z]/.test(password)) return setError("Password must contain at least 1 lowercase letter");

  setError('');

  // Register user
  const payload = { name, email, password };
  const result = await postUser(payload);

  if (!result?.acknowledged) {
    return setError('Email already exists or registration failed');
  }

  // Auto login after registration
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });

  if (res?.ok) {
    router.push(callbackUrl); // ✅ Only redirect if login success
  } else {
    setError(res?.error || 'Login failed after registration'); // ❌ Show error instead of redirect
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">

        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-base-content/60">
          Already have an account?{' '}
          <Link href={`/login?callbackUrl=${callbackUrl}`} className="text-accent cursor-pointer">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;