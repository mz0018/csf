import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BtnLogout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading || !user) return null;

  const handleLogout = async () => {
    await logout(); 
    navigate("/"); 
  };

  return (
    <button
      className="w-full bg-red-500 p-4 rounded-sm text-white cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default BtnLogout;
