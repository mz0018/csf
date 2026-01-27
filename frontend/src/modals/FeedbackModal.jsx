const FeedbackModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">
          Feedback Details
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          Queue #{feedback?.queueNumber}
        </p>

        <div className="text-sm text-gray-800 whitespace-pre-wrap">
          {feedback?.otherSuggestions || "No additional comments."}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
