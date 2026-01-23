import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import axios from "axios";

const useFeedback = (selectedOfficeId, enabled = true) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!enabled || !user || !selectedOfficeId) return;

    const controller = new AbortController();

    const getFeedbacks = async () => {
      try {
        setLoading(true);

        if (Number(selectedOfficeId) === 20) {
          console.log("Show IT data in here")
        }

        const response = await api.get(
          `/client/feedback/${selectedOfficeId}`
        );

        setFeedback(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Something went wrong!", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getFeedbacks();

    return () => controller.abort();
  }, [user, selectedOfficeId, enabled]);

  return { loading, feedback };
};

export default useFeedback;
