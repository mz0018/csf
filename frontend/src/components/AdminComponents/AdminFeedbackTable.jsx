import { useState } from "react";
import useFeedback from "../../hooks/useFeedback";
import { offices } from "../../mocks/Offices";
import { ExternalLink, Building2 } from "lucide-react";
import FeedbackModal from "../../modals/FeedbackModal";

const AdminFeedbackTable = () => {
  const [selectedOfficeId, setSelectedOfficeId] = useState("9");
  const { loading, feedback: feedbackData } = useFeedback(selectedOfficeId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const feedbacks = feedbackData?.feedback || [];
  const averages = feedbackData?.averages || {};

  const handleOfficeChange = (e) => {
    setSelectedOfficeId(e.target.value);
  };

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  }

  return (
    <div>
      {/* Date / Filter placeholder (kept simple) */}
      <div className="space-y-4">
        {/* Keep your filter here if needed */}
      </div>

      <div className="mb-4 text-[var(--black-csf)] flex items-center gap-3">
        <Building2 className="w-5 h-5 text-[var(--button-color)]" />

        <label htmlFor="office-select" className="font-medium">
          Select Office:
        </label>

        <select
          id="office-select"
          value={selectedOfficeId}
          onChange={handleOfficeChange}
          className="rounded bg-[var(--table-color)] px-2 py-1 text-sm cursor-pointer
                    border-none outline-none appearance-none
                    focus:outline-none focus:border-none focus:ring-0
                    hover:bg-[var(--hover-color)]"
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
      {/* {loading && <p>Loading feedback...</p>} */}

      {/* Feedback Table */}
      {feedbacks.length > 0 && (
        <div className="bg-[var(--table-color)] hidden sm:block overflow-x-auto mt-4 text-left rounded">
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
                  Ratings
                </th>
                <th className="border-b border-gray-200 px-6 py-6" scope="col">
                  {/* Options */}
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
                  <td className="border-b border-gray-200 text-[var(--text-color)] px-6 py-6">
                    <span className="">
                      {averages[f._id]?.toFixed(2) ?? "—"}
                    </span>
                    <span className="ml-1 text-xs">/ 5</span>
                  </td>
                  <td className="border-b border-gray-200 px-6 py-6">
                    <ExternalLink className="h-4 w-4 cursor-pointer" onClick={() => openFeedbackModal(f)} />
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

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedback={selectedFeedback} />
    </div>
  );
};

export default AdminFeedbackTable;
