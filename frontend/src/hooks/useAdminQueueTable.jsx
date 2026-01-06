import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../../src/socket";

const LIMIT = 15;

const useAdminQueueTable = (user) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOnline, setIsOnline] = useState(false);

  const fetchQueue = useCallback(async (pageNumber = 1) => {
    if (!user?._id) return;

    try {
      setIsLoading(true);

      const res = await api.get(
        `client/getqueue/${user._id}?page=${pageNumber}`
      );

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

  useEffect(() => {
    fetchQueue(1);
  }, [fetchQueue]);

  useEffect(() => {
    if (!user?.officeId) return;

    const socket = connectSocket(user.officeId);

    socket.on("connect", () => {
      setIsOnline(true);
    });

    socket.on("disconnect", () => {
      setIsOnline(false);
    });

    socket.on("newQueue", (ticket) => {
      setList((prev) => [ticket, ...prev].slice(0, LIMIT));
    });

    return () => {
      disconnectSocket();
    };
  }, [user?.officeId]);

  const goPrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchQueue(newPage);
    }
  };

  const goNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchQueue(newPage);
    }
  };

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
  };
};

export default useAdminQueueTable;
