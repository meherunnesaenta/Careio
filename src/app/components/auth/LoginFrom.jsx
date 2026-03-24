'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLogin from '../Button/SocialLogin';
import { loginUser } from '@/actions/server/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter();
  const searchParams =useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const handleLogin = async (e) => {
    e.preventDefault();
 
    const form = e.target
    const payload = {
      email: form.email.value,
      password: form.password.value
    }
    const result = await signIn("credentials", {
    redirect: false, 
    email,
    password,
  });
    if (result) { 
      alert("Login successful ✅");
      router.push(callbackUrl)
    } else {
      alert("Invalid email or password ❌");
    }
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
              type="email" name='email'
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
              type="password" name='password'
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
          <Link href={`/register?callbackUrl=${callbackUrl}`} className="text-accent cursor-pointer">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;