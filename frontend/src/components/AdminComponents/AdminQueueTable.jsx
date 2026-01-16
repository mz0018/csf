import React, { lazy, useRef, Suspense, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import useAdminQueueTable from "../../hooks/useAdminQueueTable";
import AdminQueueTableFallback from "../../fallbacks/AdminQueueTableFallback";
import { Copy, MapPin, Inbox } from "lucide-react";
import { Notyf } from "notyf";
import { Tooltip } from "react-tooltip";
import { offices } from "../../mocks/Offices";
import "notyf/notyf.min.css";
import "react-tooltip/dist/react-tooltip.css";
import ITQueueTable from "../ITComponents/ITQueueTable";
import ITQueueMobileTable from "../ITComponents/ITQueueMobileTable";
import BtnGenerateQueueFallback from "../../fallbacks/BtnGenerateQueueFallback";
import AdminQueueEmptyTableFallback from "../../fallbacks/AdminQueueEmptyTableFallback";

const BtnGenerateQueueNum = lazy(() => import('../../buttons/BtnGenerateQueueNum'));


const AdminQueueTable = () => {
  const { user } = useAuth();
  const { list, isLoading, error, isOnline, page, totalPages, limit, goPrev, goNext } = useAdminQueueTable(user);

  const office = offices.find((office) => office.id === user.officeId);
  const officeName = office ? office.name : "Unknown Office";
  const officeId = office ? office.id : null;

  const notyf = new Notyf({
    position: { x: "right", y: "top" },
    duration: 2000,
    types: [
      { type: "success", background: "green", icon: false },
      { type: "error", background: "red", icon: false }
    ]
  });

  const [isLargeScreen, setIsLargeScreen] = useState(typeof window !== 'undefined' ? window.innerWidth > 1024 : false);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1024);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  const lastCopiedRef = useRef(null);

  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading queue.</p>;

  const handleCopy = (queueNumber) => {
    if (lastCopiedRef.current === queueNumber) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(queueNumber)
        .then(() => {
          notyf.success(`${queueNumber} copied to clipboard!`);
          lastCopiedRef.current = queueNumber;

          setTimeout(() => { lastCopiedRef.current = null; }, 3000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          notyf.error("Failed to copy!");
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = queueNumber;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        notyf.success(`${queueNumber} copied to clipboard!`);
        lastCopiedRef.current = queueNumber;
        setTimeout(() => { lastCopiedRef.current = null; }, 3000);
      } catch (err) {
        console.error('Fallback copy failed: ', err);
        notyf.error("Failed to copy!");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
      {/* <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
      </div> */}

      <Suspense fallback={<BtnGenerateQueueFallback />}>
        {isLargeScreen ? (
          officeId !== 20 && <BtnGenerateQueueNum />
        ) : (
          <p className="flex sm:hidden items-center gap-2 text-sm text-amber-800 bg-amber-100 border border-amber-300 rounded-md px-4 py-2 italic w-full">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M4.93 19.07a10 10 0 1114.14 0l-7.07-7.07-7.07 7.07z"
              />
            </svg>
            Queue generation is only available on larger screens. Please use a desktop.
          </p>
        )}
      </Suspense>
    </div>

      {list.length === 0 ? (
        <AdminQueueEmptyTableFallback />
      ) : (
        <>
          <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto mt-4 text-left">
            {officeId !== 20 ? (
              <table className="table-auto w-full">
                <thead>
                  <tr className="uppercase tracking-wider text-[var(--heading-color)]">
                    <th className="border-b border-gray-200 px-6 py-6" scope="col">Queue Number</th>
                    <th className="border-b border-gray-200 px-6 py-6" scope="col">Status</th>
                    <th className="border-b border-gray-200 px-6 py-6" scope="col">Date Created</th>
                    <th className="border-b border-gray-200 px-6 py-6" scope="col">Expires At</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((q) => (
                    <tr
                      key={q._id}
                      className="text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
                    >
                      <td className="border-b border-gray-200 px-6 py-6">
                        <div className="flex items-center gap-2 text-sm">
                          {q.queueNumber}
                          {q.status.toLowerCase() !== "expired" && (
                            <>
                              <button
                                type="button"
                                id={`copy-${q.queueNumber}`}
                                onClick={() => handleCopy(q.queueNumber)}
                                aria-label={`Copy queue number ${q.queueNumber}`}
                                className="p-1 hover:opacity-80"
                              >
                                <Copy
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  focusable="false"
                                />
                              </button>

                              <Tooltip
                                anchorId={`copy-${q.queueNumber}`}
                                content="Copy to clipboard"
                              />
                            </>
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
                        {q.status.toLowerCase() === "expired" || q.status.toLowerCase() === "completed"
                          ? "-- : -- : --"
                          : new Date(q.expiresAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <ITQueueTable />
            )}
          </div>

          {/* Mobile screen card part */}
          {officeId === 20 ? (
            <ITQueueMobileTable data={list} />
          ) : (
            <div className="sm:hidden mt-4 space-y-3">
              {list.map((q) => (
                <div
                  key={q._id}
                  className="flex rounded-md overflow-hidden bg-[var(--table-color)] hover:bg-[var(--hover-color)] transition-colors cursor-pointer"
                >
                  <div className="w-1 bg-[var(--button-color)]" />

                  <div className="flex-1 p-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase text-[var(--text-color)]">
                        Queue
                      </span>

                      <span className="text-xs font-light tracking-wider">
                        {q.status}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold text-xl">
                        {q.queueNumber}
                      </span>
                    </div>

                    <div className="mt-3 text-xs uppercase text-[var(--text-color)]">
                      {new Date(q.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex gap-2 mt-4 text-sm sm:text-base justify-end items-center">
        <button
          disabled={page === 1}
          onClick={goPrev}
          className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-[var(--text-color)] cursor-pointer"
        >
          Prev
        </button>

        <span className="text-xs text-[var(--text-color)]">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={goNext}
          className="px-2 py-1 sm:px-3 sm:py-1 border disabled:opacity-50 disabled:cursor-not-allowed rounded-sm text-[var(--text-color)] cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminQueueTable;
