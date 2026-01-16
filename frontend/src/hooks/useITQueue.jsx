import { useEffect, useState } from "react";
import axios from "axios";

const useITQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQueueData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          import.meta.env.VITE_IP_NI_SIR_DAVE,
          { signal: controller.signal }
        );

        setQueueData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQueueData();

    return () => controller.abort();
  }, []);

  return {
    queueData,
    loading,
    error,
  };
};

export default useITQueue;
