import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <div className="p-3 ">
          <div className="flex justify-center">
          <img src={user.picture} className="rounded-full" alt={user.name} />
          </div>
          <h2 className="flex justify-center font-semibold text-2xl">{user.name}</h2>
          <p className="flex justify-center font-medium">{user.email}</p>
        </div>
      ):(<p className="flex justify-center p-5">Please login or signup</p>)}
    </div>
  );
}

export default Profile;
