import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { TicketPlus, Loader } from "lucide-react";

const BtnGenerateQueueNum = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleClick = async () => {
        if (!user.officeId) {
            console.error("User has no office assigned.");
            return;
        }

        try {
            setLoading(true);

            // await new Promise((resolve) => setTimeout(resolve, 10000));

            const response = await api.post(`client/queue/generate/${user.officeId}`);
            
            if (response.data?.success === true) {
                setQueue(response.data);
            }

        } catch (err) {
            console.error('Something went wrong: ', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.table(queue);
    }, [queue]);

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="text-sm flex items-center gap-2 bg-[var(--button-color)] hover:bg-[var(--btn-hover-color)] text-white px-6 py-4 rounded-sm cursor-pointer transition tracking-wide justify-center"
        >
            {loading ? (
                <>
                    <Loader size={20} className="animate-spin" />
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <TicketPlus size={25} className="rotate-45" />
                    <span>Generate Queue Number</span>
                </>
            )}
        </button>
    );
};

export default BtnGenerateQueueNum;
