import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const INITIAL_STATE = {
  firstName: "",
  middleName: "",
  lastName: "",
  position: "",
  username: "",
  officeId: "",
  officeName: "",
  role: "",
  password: "123456",
};

const useBtnRegisterUser = (onSuccess) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "officeId") {
      const officeName =
        selectedOptions[0]?.getAttribute("data-name") || "";

      setFormData((prev) => ({
        ...prev,
        officeId: value,
        officeName,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrors(null);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/it/register-user`,
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Office Admin registered successfully",
        confirmButtonColor: "#22c55e",
      });

      onSuccess?.();

      resetForm();
      return true;

    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";

      setErrors(message);
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useBtnRegisterUser;
