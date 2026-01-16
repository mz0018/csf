import useITQueue from "../../hooks/useITQueue";

const ITQueueTable = () => {
  const { queueData, loading, error } = useITQueue();

  if (error) return <p>Error</p>;

  return (
    <div className="w-full">
      <table className="table-auto w-full">
        <thead>
          <tr className="uppercase tracking-wider text-[var(--heading-color)]">
            <th className="border-b border-gray-200 px-6 py-6">Queue Number</th>
            <th className="border-b border-gray-200 px-6 py-6">Client Name</th>
            <th className="border-b border-gray-200 px-6 py-6">Status</th>
            <th className="border-b border-gray-200 px-6 py-6">Created at</th>
          </tr>
        </thead>

        <tbody>
          {queueData.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center py-10 text-sm text-[var(--text-color)]"
              >
                No logs found
              </td>
            </tr>
          ) : (
            queueData.map((item) => (
              <tr
                key={item.id}
                className="text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
              >
                <td className="border-b border-gray-200 px-6 py-6">
                  {item.request_code}
                </td>

                <td className="border-b border-gray-200 px-6 py-6 capitalize">
                  {item.client_name}
                </td>

                <td className="border-b border-gray-200 px-6 py-6">
                  {item.status.charAt(0).toUpperCase() +
                    item.status.slice(1).toLowerCase()}
                </td>

                <td className="border-b border-gray-200 px-6 py-6">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ITQueueTable;
