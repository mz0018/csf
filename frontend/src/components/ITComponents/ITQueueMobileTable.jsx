import React, { useState, useEffect } from "react";
import axios from "axios";

const ITQueueMobileTable = ({ data }) => {
    const [queueData, setQueueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQueueData = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_IP_NI_SIR_DAVE}`
            );
            setQueueData(response.data);
        } catch (error) {
            console.error("Error fetching queue data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchQueueData();
    }, []);

    if (loading) return <p>Loading...</p>;


  return (
    <div className="sm:hidden mt-4 space-y-3">
      {queueData.map((item) => (
        <div
          key={item.id}
          className="flex rounded-md overflow-hidden bg-[var(--table-color)] hover:bg-[var(--hover-color)] transition-colors"
        >
          <div className="w-1 bg-[var(--button-color)]" />

          <div className="flex-1 p-3">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-[var(--text-color)]">
                Queue
              </span>

              <span className="text-xs font-light tracking-wider">
                {item.status}
              </span>
            </div>

            <div className="mt-1">
              <span className="font-semibold text-xl">
                {item.request_code}
              </span>
            </div>

            <div className="mt-2 text-xs uppercase text-[var(--text-color)]">
              Client
            </div>

            <div className="text-sm font-medium capitalize">
              {item.client_name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ITQueueMobileTable;
