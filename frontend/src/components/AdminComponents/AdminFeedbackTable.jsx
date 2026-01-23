import { useState } from "react";
import useFeedback from "../../hooks/useFeedback";
import { offices } from "../../mocks/Offices";

const AdminFeedbackTable = () => {
        const [selectedOfficeId, setSelectedOfficeId] = useState("9");
        const { loading, feedback: feedbackData } = useFeedback(selectedOfficeId);

        const feedbacks = feedbackData?.feedback || [];

        const handleOfficeChange = (e) => {
            setSelectedOfficeId(e.target.value);
        };

        return (
            <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">HR Admin Feedback Section</h2>

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

            {loading && <p>Loading feedback...</p>}

            {feedbacks.length > 0 && (
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Queue Number</th>
                        <th className="py-2 px-4 border-b text-left">Submitted At</th>
                        <th className="py-2 px-4 border-b text-left">Other Suggestions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedbacks.map((f) => (
                        <tr key={f._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{f.queueNumber}</td>
                        <td className="py-2 px-4 border-b">
                            {new Date(f.submittedAt).toLocaleString()}
                        </td>
                        <td className="py-2 px-4 border-b">{f.otherSuggestions || "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}

            {!loading && feedbacks.length === 0 && selectedOfficeId && (
                <p className="text-gray-500">No feedback found for this office.</p>
            )}
            </div>
        );
}

export default AdminFeedbackTable;