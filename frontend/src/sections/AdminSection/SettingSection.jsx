import React from "react";
import { useAuth } from "../../context/AuthContext";

const SettingSection = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available</p>;

  console.log(user);

  return (
    <div>
      <h2>Settings Section</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Object id:</strong> {user._id}
      </p>
    </div>
  );
};

export default SettingSection;
