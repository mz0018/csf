import axios from "axios";
import React, { useState, useEffect } from "react";

const ITQueueTable = () => {
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
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          <tr className="uppercase tracking-wider text-[var(--heading-color)]">
            <th className="border-b border-gray-200 px-6 py-6" scope="col">
              Queue Number
            </th>
            <th className="border-b border-gray-200 px-6 py-6" scope="col">
              Client Name
            </th>
            <th className="border-b border-gray-200 px-6 py-6" scope="col">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {queueData.map((item) => (
            <tr
              key={item.id}
              className="text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
            >
              <td className="border-b border-gray-200 px-6 py-6">
                <div className="text-sm">{item.request_code}</div>
              </td>

              <td className="border-b border-gray-200 px-6 py-6 capitalize">
                {item.client_name}
              </td>

              <td className="border-b border-gray-200 px-6 py-6">
                {item.status.charAt(0).toUpperCase() +
                  item.status.slice(1).toLowerCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ITQueueTable;
