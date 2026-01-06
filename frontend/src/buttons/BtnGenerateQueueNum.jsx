import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const BtnGenerateQueueNum = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleClick = async () => {

        if (!user.officeId) {
            console.error("User has no officed assigned.");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post(`client/queue/generate/${user.officeId}`);
            
            if (response.data?.success === true) {
                setQueue(response.data);
            }

        } catch (err) {
            console.error('Something went wrong: ', err);
            debugger
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.table(queue)
    }, [queue])

    return (
        <button className="bg-green-500 text-white p-4 rounded-sm" disabled={loading} onClick={() => handleClick()}>
            {loading ? 'Loading...' : 'Generate Queue Number'}
        </button>
    )
}

export default BtnGenerateQueueNum;