import React, { lazy, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import useAdminQueueTable from "../../hooks/useAdminQueueTable";
import NoQueueFound from "../../fallbacks/NoQueueFound";
import { Copy, MapPin } from "lucide-react";
import { Notyf } from "notyf";
import { Tooltip } from "react-tooltip";
import { offices } from "../../mocks/Offices";
import "notyf/notyf.min.css";
import "react-tooltip/dist/react-tooltip.css";

const BtnGenerateQueueNum = lazy(() => import('../../buttons/BtnGenerateQueueNum'));

const AdminQueueTable = () => {
  const { user } = useAuth();
  const { list, isLoading, error, isOnline, page, totalPages, goPrev, goNext, canGenerate } = useAdminQueueTable(user);

  const officeName = offices.find(o => o.id === user.officeId)?.name || "Unknown Office";
  const lastCopiedRef = useRef(null);

  const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 2000 });

  const handleCopy = (queueNumber) => {
    if (lastCopiedRef.current === queueNumber) return;

    navigator.clipboard.writeText(queueNumber)
      .then(() => {
        notyf.success(`${queueNumber} copied!`);
        lastCopiedRef.current = queueNumber;
        setTimeout(() => { lastCopiedRef.current = null; }, 3000);
      })
      .catch(() => notyf.error("Failed to copy!"));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading queue.</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        <div className={`flex items-center space-x-2`}>
          <div className={`w-3 h-3 rounded-full animate-pulse ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
        </div>
        {canGenerate ? <BtnGenerateQueueNum /> : <p className="text-xs text-[var(--text-color)]">Expand your screen to generate queue numbers.</p>}
      </div>

      {/* Empty state */}
      {list.length === 0 ? <NoQueueFound className="mt-5" /> : (
        <>
          {/* Desktop Table */}
          <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto mt-4 text-left">
            <table className="table-auto w-full">
              <thead>
                <tr className="uppercase tracking-wider text-[var(--heading-color)]">
                  {["Queue Number","Status","Date Created","Expires At"].map(h => (
                    <th key={h} className="border-b border-gray-200 px-6 py-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(q => (
                  <tr key={q._id} className="text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors">
                    <td className="border-b border-gray-200 px-6 py-6 flex items-center gap-2 text-sm">
                      {q.queueNumber}
                      {q.status.toLowerCase() !== "expired" && (
                        <>
                          <button onClick={() => handleCopy(q.queueNumber)} className="p-1 hover:opacity-80" aria-label={`Copy ${q.queueNumber}`} id={`copy-${q.queueNumber}`}>
                            <Copy className="w-4 h-4" />
                          </button>
                          <Tooltip anchorId={`copy-${q.queueNumber}`} content="Copy to clipboard" />
                        </>
                      )}
                    </td>
                    <td className="border-b border-gray-200 px-6 py-6">{q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase()}</td>
                    <td className="border-b border-gray-200 px-6 py-6">{new Date(q.createdAt).toLocaleDateString("en-US", { weekday:"short", year:"numeric", month:"short", day:"numeric" })}</td>
                    <td className="border-b border-gray-200 px-6 py-6">{q.status.toLowerCase() === "expired" ? "-- : -- : --" : new Date(q.expiresAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden mt-4 space-y-3">
            {list.map(q => (
              <div key={q._id} className="flex rounded-md overflow-hidden bg-[var(--table-color)] hover:bg-[var(--hover-color)] transition-colors cursor-pointer">
                <div className="w-1 bg-[var(--button-color)]" />
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase text-[var(--text-color)]">Queue</span>
                    <span className="text-xs font-light tracking-wider">{q.status}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-semibold text-xl">{q.queueNumber}</span>
                    {q.status.toLowerCase() !== "expired" && (
                      <button onClick={() => handleCopy(q.queueNumber)} className="p-1 hover:opacity-80">
                        <Copy className="w-3 h-3 text-[var(--text-color)]" />
                      </button>
                    )}
                  </div>

                  <div className="mt-1 text-sm border-b border-[var(--text-color)] pb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[var(--button-color)] shrink-0" strokeWidth={2.5} />
                    <span>{officeName}</span>
                  </div>

                  <div className="mt-3 text-xs flex gap-2 uppercase text-[var(--text-color)]">
                    <span>{new Date(q.createdAt).toLocaleDateString("en-US", { day:"2-digit", month:"short", year:"numeric" })}</span>
                    <span>|</span>
                    <span>Expires at: {q.status.toLowerCase() === "expired" ? "-- : --" : new Date(q.expiresAt).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-4 text-sm sm:text-base justify-end items-center">
        <button disabled={page === 1} onClick={goPrev} className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-[var(--text-color)] cursor-pointer">Prev</button>
        <span className="text-xs text-[var(--text-color)]">Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={goNext} className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-[var(--text-color)] cursor-pointer">Next</button>
      </div>
    </div>
  );
};

export default AdminQueueTable;
