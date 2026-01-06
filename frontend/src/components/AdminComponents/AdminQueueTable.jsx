import React, { lazy } from "react";
import { useAuth } from "../../context/AuthContext";
import useAdminQueueTable from "../../hooks/useAdminQueueTable";
import { offices } from "../../mocks/Offices";

const BtnGenerateQueueNum = lazy(() => import('../../buttons/BtnGenerateQueueNum'));

const AdminQueueTable = () => {
  const { user } = useAuth();
  const { list, isLoading, error, isOnline, page, totalPages, limit, goPrev, goNext } = useAdminQueueTable(user);

  const office = offices.find((office) => office.id === user.officeId);
  const officeName = office ? office.name : "Unknown Office";

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading queue.</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 ${isOnline ? "bg-green-500" : "bg-red-500"} rounded-full animate-pulse`}
          ></div>
          <span>{officeName} Real-time Monitoring</span>
        </div>

        <BtnGenerateQueueNum />
      </div>

      {list.length === 0 ? (
        <p>No queues found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Queue Number</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date Created</th>
              <th className="border px-4 py-2">Expires At</th>
            </tr>
          </thead>
          <tbody>
            {list.map((q, index) => (
              <tr key={q._id}>
                <td className="border px-4 py-2">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="border px-4 py-2">{q.queueNumber}</td>
                <td className="border px-4 py-2">{q.status}</td>
                <td className="border px-4 py-2">
                  {new Date(q.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(q.expiresAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={goPrev}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={goNext}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminQueueTable;
