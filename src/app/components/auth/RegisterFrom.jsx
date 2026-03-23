'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least 1 uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least 1 lowercase letter");
    }

    setError('');

    // এখানে API call দিবা
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Username */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Error Message */}
          {error && (
            <p className="text-error text-sm">{error}</p>
          )}

          {/* Register Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>

        </form>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-base-content/60">
          Already have an account?{" "}
          <Link href={'/login'} className="text-accent cursor-pointer">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;