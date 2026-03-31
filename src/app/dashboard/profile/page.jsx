'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-center mt-10">Loading...</p>;
  }
 console.log(session);
  const user = session.user;


  const handleDeleteAccount=()=>{
    alert("Account deletion is not implemented yet.");
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-base-100 shadow-xl rounded-2xl p-6 max-w-3xl mx-auto">

        {/* Profile Top */}
        <div className="flex items-center gap-6">
          <img
            src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-base">{user?.email}</p>

            <span className="badge badge-primary mt-2 capitalize">
              {session?.role}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <p className="text-sm text-accent">Full Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-accent">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-accent">Role</p>
            <p className="font-medium capitalize">{session?.role || "user"}</p>
          </div>

          <div>
            <p className="text-sm text-accent">Joined</p>
            <p className="font-medium">{session?.expires ? new Date(session?.expires).toLocaleDateString() : "N/A"}</p>
          </div>

        </div>

        {/* Button */}
        {/* <div className="mt-6 text-right">
          <button onClick={handleDeleteAccount} className="btn btn-error">
            Delete Account
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default Profile;