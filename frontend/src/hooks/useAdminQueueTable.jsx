import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../../src/socket";

const LIMIT = 15;

const useAdminQueueTable = (user) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [canGenerate, setCanGenerate] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOnline, setIsOnline] = useState(false);

  // Fetch queue
  const fetchQueue = useCallback(async (pageNumber = 1) => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const res = await api.get(`client/getqueue/${user._id}?page=${pageNumber}`);
      setList(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch queue:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?._id]);

  // Initial fetch
  useEffect(() => { fetchQueue(1); }, [fetchQueue]);

  // Socket connection
  useEffect(() => {
    if (!user?.officeId) return;
    const socket = connectSocket(user.officeId);

    socket.on("connect", () => setIsOnline(true));
    socket.on("disconnect", () => setIsOnline(false));
    socket.on("newQueue", (ticket) => {
      setList(prev => [ticket, ...prev].slice(0, LIMIT));
    });

    return () => disconnectSocket();
  }, [user?.officeId]);

  // Screen width detection (desktop only)
  useEffect(() => {
    const updateCanGenerate = () => setCanGenerate(window.innerWidth >= 1024);
    updateCanGenerate();

    window.addEventListener("resize", updateCanGenerate);
    return () => window.removeEventListener("resize", updateCanGenerate);
  }, []);

  // Pagination helpers
  const goPrev = () => { if (page > 1) fetchQueue(page - 1); };
  const goNext = () => { if (page < totalPages) fetchQueue(page + 1); };

  return {
    list,
    isLoading,
    error,
    isOnline,
    page,
    totalPages,
    limit: LIMIT,
    goPrev,
    goNext,
    canGenerate
  };
};

export default useAdminQueueTable;
