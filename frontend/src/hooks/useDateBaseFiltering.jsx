import { useState, useEffect } from "react";
import api from "../services/api";

const useDateBaseFiltering = (officeId) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState(null);

    useEffect(() => {
        if (!officeId) return;

        const getByDateToday = async () => {
            setLoading(true);
            try {
                const response = await api.post(`/client/getByDateToday/${officeId}`);
                console.log(response.data);
                setList(response.data);
            } catch (err) {
                setHasErrors(err.response?.data?.message || "Server error");
            } finally {
                setLoading(false);
            }
        };

        getByDateToday();
    }, [officeId]);

    return { list, loading, hasErrors }
}

export default useDateBaseFiltering;