import { useEffect, useRef, useState } from "react";
import axios from "axios";

const useITQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lastFetchedRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchInitial = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/client/itrs`, {
          signal: controller.signal,
        });

        setQueueData(res.data);

        if (res.data.length > 0) {
          lastFetchedRef.current = res.data[0].created_at;
        }
      } catch (err) {
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
    return () => controller.abort();
  }, [API_URL]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!lastFetchedRef.current) return;

        const res = await axios.get(
          `${API_URL}?since=${lastFetchedRef.current}`
        );

        if (res.data.length > 0) {
          setQueueData((prev) => {
            const map = new Map(prev.map((row) => [row.id, row]));

            res.data.forEach((row) => {
              map.set(row.id, row);
            });

            return Array.from(map.values()).sort(
              (a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            );
          });

          lastFetchedRef.current = res.data[0].created_at;
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [API_URL]);

  return {
    queueData,
    loading,
    error,
  };
};

export default useITQueue;
