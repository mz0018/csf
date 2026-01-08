import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSigninAdmin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasError(null);

    try {
      console.log("Submitting:", formData);
      const response = await api.post("/client/signin", formData);

      if (response.data.success) {
        login(response.data.data, response.data.token);
        navigate("/admindashboard");  
      } else {
        setHasError(response.data.message);
      }
    } catch (err) {
      setHasError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  return {
    formData,
    loading,
    hasError,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useSigninAdmin;
