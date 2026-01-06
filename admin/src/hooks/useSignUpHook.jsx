import React, { useState } from "react";
import axios from "axios";

const useSignUpHook = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/it/signup`, formData);
      setSuccess(true);
      console.log("Signup Successful: ", response);
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    success
  };
};

export default useSignUpHook;
