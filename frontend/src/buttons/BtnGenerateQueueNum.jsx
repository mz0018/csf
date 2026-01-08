import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { TicketPlus, Loader } from "lucide-react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import usePrintHook from "../hooks/usePrintHook";

const BtnGenerateQueueNum = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rateLimited, setRateLimited] = useState(false);
    const { user } = useAuth();

    const { printQueueTicket } = usePrintHook();

    const notyf = new Notyf({
        position: { x: "right", y: "top" },
        duration: 3000,
        types: [
            { type: "success", background: "green", icon: false },
            { type: "error", background: "red", icon: false }
        ]
    });

    const handleClick = async () => {
        if (!user.officeId) {
            console.error("User has no office assigned.");
            return;
        }

        if (rateLimited) return;

        try {
            setLoading(true);

            const response = await api.post(`client/queue/generate/${user.officeId}`);

            if (response.data?.success === true) {
                setQueue(response.data);
                notyf.success(`${response.data.queueNumber} generated successfully!`);

                printQueueTicket(
                    response.data.queueNumber,
                    response.data.expiresAt,
                );
            }

        } catch (err) {
            if (err.response && err.response.status === 429) {
                if (!rateLimited) {
                    notyf.error(err.response.data.message || "Too many requests. Please wait.");
                    setRateLimited(true);

                    setTimeout(() => setRateLimited(false), 10000);
                }
            } else {
                notyf.error("Something went wrong!");
                console.error("Error generating queue:", err);
            }
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
            disabled={loading || rateLimited}
            className={`text-sm flex items-center gap-2 bg-[var(--button-color)] hover:bg-[var(--btn-hover-color)] text-white px-6 py-4 rounded-sm cursor-pointer transition tracking-wide justify-center ${
                loading || rateLimited ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
