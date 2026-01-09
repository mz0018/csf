import { useState } from "react";
import api from "../services/api";

const useVerifyQueueNumber = (queueNumber) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const handleVerification = async () => {
        try {
            setLoading(true);
            setHasError(null);

            const response = await api.post("/client/verify-queue", { queueNumber });
            const QueueTicket = response.data.ticket;

            console.log(QueueTicket.officeId);

            return response.data;
        } catch (error) {
            console.error("Error verifying queue number:", error);
            setHasError(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return { handleVerification, loading, hasError };
};

export default useVerifyQueueNumber;
