'use client'
import { useSession } from 'next-auth/react';
import React from 'react';

const ConditionOfDash = () => {
    const {data: session, status} = useSession();
    console.log(session, status);
  return (
    <div>
        {session?.role==="admin" ? 'admin ' : session?.role==="user" ? "User Dashboard" : "No Dashboard"}
    </div>
  );
};

export default ConditionOfDash;