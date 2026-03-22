'use client'
import React from 'react';
import { SessionProvider } from "next-auth/react"
const NextAuthSession = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  );
};

export default NextAuthSession;