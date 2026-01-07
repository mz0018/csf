const AdminQueueTableFallback = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="mt-4">
      {/* Desktop Table Skeleton */}
      <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto text-left">
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
            {rows.map((_, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                {[...Array(4)].map((__, i) => (
                  <td key={i} className="px-6 py-6">
                    <div className="h-4 bg-gray-300 rounded w-full max-w-[80%] animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden mt-4 space-y-3">
        {rows.map((_, idx) => (
          <div
            key={idx}
            className="flex rounded-md overflow-hidden bg-[var(--table-color)] transition-colors cursor-pointer"
          >
            <div className="w-1 bg-gray-300 animate-pulse" />

            <div className="flex-1 p-3 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQueueTableFallback;
