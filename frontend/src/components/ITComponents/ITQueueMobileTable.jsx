import { Copy, MapPin } from "lucide-react";
import useITQueue from "../../hooks/useITQueue";

const ITQueueMobileTable = () => {
  const { queueData, loading, error } = useITQueue();

  if (error) return <p>Error</p>;

  if (queueData.length === 0) {
    return (
      <div className="sm:hidden mt-4 text-center text-sm text-[var(--text-color)]">
        No logs found
      </div>
    );
  }

  return (
    <div className="sm:hidden mt-4 space-y-3">
      {queueData.map((q) => (
        <div
          key={q.id}
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
                {q.request_code}
              </span>

              {q.status.toLowerCase() !== "expired" && (
                <button
                  type="button"
                  onClick={() => handleCopy(q.request_code)}
                  aria-label={`Copy queue number ${q.request_code}`}
                  className="p-1 hover:opacity-80"
                >
                  <Copy
                    className="w-3 h-3 text-[var(--text-color)]"
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>
              )}
            </div>

            <div className="mt-1 text-sm border-b border-[var(--text-color)] pb-2 flex items-center gap-1">
              <MapPin
                className="w-4 h-4 text-[var(--button-color)] shrink-0"
                strokeWidth={2.5}
              />
              <span>{q.office}</span>
            </div>

            <div className="mt-3 text-xs flex gap-2 uppercase text-[var(--text-color)]">
              <span>
                {new Date(q.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span>|</span>

              <span className="capitalize">
                Client:&nbsp;
                {q.client_name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ITQueueMobileTable;
