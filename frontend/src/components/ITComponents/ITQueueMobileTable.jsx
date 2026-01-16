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

            <div className="mt-1 text-xs uppercase text-[var(--text-color)]">
              Client
            </div>

            <div className="text-sm font-medium capitalize">
              {item.client_name}
            </div>

            <div className="mt-3 text-xs uppercase text-[var(--text-color)]">
              {new Date(item.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ITQueueMobileTable;
