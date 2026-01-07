import React from "react";
import { Inbox } from "lucide-react";
import { offices } from "../mocks/Offices";
import { useAuth } from "../context/AuthContext";

const AdminQueueEmptyTableFallback = () => {
  const { user } = useAuth();
  const office = offices.find((office) => office.id === user.officeId);
  const officeName = office ? office.name : "Unknown Office";

  return (
    <div className="mt-4">
      {/* Desktop Table Layout */}
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
            <tr className="text-[var(--text-color)]">
              <td
                colSpan={4}
                className="border-b border-gray-200 px-6 py-6 text-center align-middle min-h-[72px]"
              >
                <div className="flex flex-col items-center justify-center gap-3 min-h-full">
                  <Inbox className="w-12 h-12 text-gray-400" />
                  <p className="font-light text-md">
                    No queues yet. Generate one to get started!
                  </p>
                  <span className="text-sm text-gray-500">{officeName}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden mt-4 space-y-3">
        <div className="flex rounded-md overflow-hidden bg-[var(--table-color)] p-6 flex-col items-center justify-center gap-3 min-h-[150px]">
          <Inbox className="w-12 h-12 text-gray-400" />
          <p className="font-light text-md text-center">
            No queues yet. Generate one to get started!
          </p>
          <div className="text-xs text-gray-500">{officeName}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminQueueEmptyTableFallback;
