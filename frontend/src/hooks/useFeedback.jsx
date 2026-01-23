import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const useFeedback = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/client/feedback");
      setData(response.data);
    } catch (err) {
      console.error("Something went wrong!", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getFeedbacks();
  }, [user]);

  return { loading, data };
};

export default useFeedback;
