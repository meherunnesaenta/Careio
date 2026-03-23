'use client';

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import SocialLogin from '../Button/SocialLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/"
    });

    console.log(res);
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Login to Care.xyz
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

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

          {/* Login Button */}
          <button type="submit" className="btn btn-secondary w-full mt-2">
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <SocialLogin></SocialLogin>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-base-content/60">
          Don’t have an account?{" "}
          <Link href={'/register'} className="text-accent cursor-pointer">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;