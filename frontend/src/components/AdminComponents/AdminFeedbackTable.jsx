import { useState } from "react";
import useFeedback from "../../hooks/useFeedback";
import { offices } from "../../mocks/Offices";
import { ExternalLink } from "lucide-react";

const AdminFeedbackTable = () => {
  const [selectedOfficeId, setSelectedOfficeId] = useState("9");
  const { loading, feedback: feedbackData } = useFeedback(selectedOfficeId);

  const feedbacks = feedbackData?.feedback || [];

  const handleOfficeChange = (e) => {
    setSelectedOfficeId(e.target.value);
  };

  return (
    <div>
      {/* Date / Filter placeholder (kept simple) */}
      <div className="space-y-4">
        {/* Keep your filter here if needed */}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">HR Admin Feedback Section</h2>

      {/* Office Select */}
      <div className="mb-4">
        <label htmlFor="office-select" className="mr-2 font-medium">
          Select Office:
        </label>
        <select
          id="office-select"
          value={selectedOfficeId}
          onChange={handleOfficeChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">-- Choose an Office --</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Loading feedback...</p>}

      {/* Feedback Table */}
      {feedbacks.length > 0 && (
        <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto mt-4 text-left">
          <table className="table-auto w-full">
            <thead>
              <tr className="capitalize tracking-wider text-[var(--heading-color)]">
                <th className="border-b border-gray-200 px-6 py-6" scope="col">
                  Queue Number
                </th>
                <th className="border-b border-gray-200 px-6 py-6" scope="col">
                  Submitted At
                </th>
                <th className="border-b border-gray-200 px-6 py-6" scope="col">
                  Other Suggestions
                </th>
                <th className="border-b border-gray-200 px-6 py-6" scope="col">
                  Options
                </th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((f) => (
                <tr
                  key={f._id}
                  className="text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors"
                >
                  <td className="border-b border-gray-200 px-6 py-6">
                    {f.queueNumber}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-6">
                    {new Date(f.submittedAt).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-6">
                    {f.otherSuggestions || "-"}
                  </td>
                  <td className="border-b border-gray-200 px-6 py-6">
                    <ExternalLink className="h-4 w-4 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {feedbacks.length > 0 && (
        <div className="sm:hidden mt-4 space-y-3">
          {feedbacks.map((f) => (
            <div
              key={f._id}
              className="flex rounded-md overflow-hidden bg-[var(--table-color)] hover:bg-[var(--hover-color)] transition-colors cursor-pointer"
            >
              <div className="w-1 bg-[var(--button-color)]" />

              <div className="flex-1 p-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase text-[var(--text-color)]">
                    Queue
                  </span>
                  <span className="text-xs font-light tracking-wider">
                    Submitted
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold text-xl">
                    {f.queueNumber}
                  </span>
                </div>

                <div className="mt-3 text-xs flex gap-2 uppercase text-[var(--text-color)]">
                  <span>
                    {new Date(f.submittedAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span>|</span>

                  <span>
                    Time:&nbsp;
                    {new Date(f.submittedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="mt-2 text-sm text-[var(--text-color)]">
                  {f.otherSuggestions || "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No feedback message */}
      {!loading && feedbacks.length === 0 && selectedOfficeId && (
        <p className="text-gray-500">No feedback found for this office.</p>
      )}
    </div>
  );
};

export default AdminFeedbackTable;
