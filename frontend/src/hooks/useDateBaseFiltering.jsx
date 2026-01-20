import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

const useDateBaseFiltering = (officeId) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState(null);

    const fetchToday = useCallback(async () => {
        if (!officeId) return;

        setLoading(true);
        try {
            const response = await api.get(`/client/getByDateToday/${officeId}`);
            setList(response.data);
            setHasErrors(null);
        } catch (err) {
            setHasErrors(err.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    }, [officeId]);

    useEffect(() => {
        fetchToday();
    }, [fetchToday]);

    return { list, loading, hasErrors, refetch: fetchToday };
};

export default useDateBaseFiltering;
