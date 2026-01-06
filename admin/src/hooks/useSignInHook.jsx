import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSignInHook = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/it/signin", formData);
      login(response.data.data, response.data.token);
      navigate("/superadmin")
    } catch (err) {
      setError(err.response?.data?.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleInputChange, handleSubmit, loading, error };
};

export default useSignInHook;
