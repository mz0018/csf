import { useState } from "react";
import { offices } from "../mocks/Offices";

const FeedbackModal = ({ isOpen, onClose, feedback, officeId }) => {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const legend = [
    { label: "Very Satisfactory", value: "5" },
    { label: "Satisfactory", value: "4" },
    { label: "Neutral", value: "3" },
    { label: "Un-atisfactory", value: "2" },
    { label: "Very Un-Satisfactory", value: "1" },
  ];

  const office = offices.find(o => o.id === Number(officeId));

  const ratingLabel = (value) =>
    legend.find(l => l.value === String(value))?.label || "—";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className={`relative z-10 w-full sm:max-w-xl bg-white shadow-lg rounded max-h-[90vh] overflow-y-auto custom-scrollbar ${isClosing ? "slide-down-modal" : "slide-up-modal"}`}>
        
        <div className="flex items-start justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--heading-color)]">
              {feedback?.queueNumber}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-color)]">
              View detailed information for this feedback.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[var(--text-color)] hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-4 text-[var(--black-csf)]">
          
          <div>
            <label className="mb-1 block text-sm font-medium">
              LGU Office <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={office?.name || "Unknown Office"}
              readOnly
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-[var(--black-csf)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-[var(--text-color)]">
              This is the office that received the feedback.
            </p>
          </div>

          {/* Other Suggestions */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Other Suggestions
            </label>
            <textarea
              rows={3}
              value={feedback?.otherSuggestions || ""}
              readOnly
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Ratings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-200 rounded overflow-hidden text-[var(--black-csf)]">

              <tbody className="text-gray-700">
                {feedback?.ratings?.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-[var(--hover-color)]"
                  >
                    <td className="px-4 py-2 font-medium">{r.name}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-semibold">
                        {r.value}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {ratingLabel(r.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 px-4 py-4 sm:px-6">
          <p className="text-xs text-[var(--text-color)] capitalize">
            Client Name: {feedback?.respondent.name}
          </p>
          <button className="flex items-center justify-center gap-2 rounded bg-[var(--button-color)] px-5 py-2 text-white hover:bg-[var(--btn-hover-color)] cursor-pointer" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
