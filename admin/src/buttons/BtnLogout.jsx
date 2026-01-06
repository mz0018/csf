import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const BtnLogout = () => {
  const { user, token, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!token || !user)) {
      logout();
      navigate("/");
    }
  }, [token, user, logout, navigate, loading]);

  if (loading || !token || !user) return null;

  const handleLogout = () => {
    logout();
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
