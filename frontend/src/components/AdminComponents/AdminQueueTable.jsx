import React, { lazy } from "react";
import { useAuth } from "../../context/AuthContext";
import useAdminQueueTable from "../../hooks/useAdminQueueTable";
import { Copy } from "lucide-react";


const BtnGenerateQueueNum = lazy(() => import('../../buttons/BtnGenerateQueueNum'));

const AdminQueueTable = () => {
  const { user } = useAuth();
  const { list, isLoading, error, isOnline, page, totalPages, limit, goPrev, goNext } = useAdminQueueTable(user);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading queue.</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 ${isOnline ? "bg-green-500" : "bg-red-500"} rounded-full animate-pulse`}></div>
        </div>
        <BtnGenerateQueueNum />
      </div>

      {list.length === 0 ? (
        <p>No queues found.</p>
      ) : (
        <>
          <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto mt-4 text-left">
            <table className="table-auto w-full">
              <thead>
                <tr className="uppercase tracking-wider text-[var(--heading-color)]">
                  <th className="border-b border-gray-200 px-6 py-6">Queue Number</th>
                  <th className="border-b border-gray-200 px-6 py-6">Status</th>
                  <th className="border-b border-gray-200 px-6 py-6">Date Created</th>
                  <th className="border-b border-gray-200 px-6 py-6">Expires At</th>
                </tr>
              </thead>
              <tbody>
                {list.map((q) => (
                  <tr key={q._id} className="text-[var(--text-color)]">
                    <td className="border-b border-gray-200 px-6 py-6">
                      <div className="flex items-center gap-2 text-sm">
                        {q.queueNumber}
                        {q.status.toLowerCase() !== "expired" && (
                          <Copy className="w-4 h-4 cursor-pointer" />
                        )}
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-6 py-6">
                      {q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase()}
                    </td>
                    <td className="border-b border-gray-200 px-6 py-6">
                      {new Date(q.createdAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="border-b border-gray-200 px-6 py-6">
                      {q.status.toLowerCase() === "expired"
                        ? "-- : -- : --"
                        : new Date(q.expiresAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden overflow-x-auto mt-4">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="text-xs">
                  <th className="border-b px-2 py-1">#</th>
                  <th className="border-b px-2 py-1">Queue Number</th>
                  <th className="border-b px-2 py-1">Status</th>
                  <th className="border-b px-2 py-1">Expires At</th>
                </tr>
              </thead>
              <tbody>
                {list.map((q, index) => (
                  <tr key={q._id}>
                    <td className="border-b px-2 py-1">{index + 1 + (page - 1) * limit}</td>
                    <td className="border-b px-2 py-1">{q.queueNumber}</td>
                    <td className="border-b px-2 py-1">{q.status}</td>
                    <td className="border-b px-2 py-1">{new Date(q.expiresAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="flex gap-2 mt-4 text-sm sm:text-base">
        <button
          disabled={page === 1}
          onClick={goPrev}
          className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={goNext}
          className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminQueueTable;
