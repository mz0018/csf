import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import useVerifyQueueNumber from "../hooks/useVerifyQueueNumber";

const VerifyQueueForm = ({ onNext }) => {
    const { language } = useLanguage();
    const [queueNumber, setQueueNumber] = useState("");

    const { handleVerification, loading, hasError } = useVerifyQueueNumber(queueNumber);

    const handleSubmit = async () => {
        if (queueNumber.trim()) {
            const result = handleVerification();

            if (result.valid) {
                onNext(queueNumber);
            } else {
                console.error(result.message || "An error occurred. Please try again.");
            }
        }
    };

    return (
        <div
            className="p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-[350px] md:w-[450px] lg:w-[500px] transition-colors duration-300 flex flex-col gap-4"
            style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
            }}
        >
            <div className="mb-2 border-b border-[var(--border-color)] pb-5">
                <h2
                    className="text-base sm:text-lg font-semibold"
                    style={{ color: "var(--heading-color)" }}
                >
                    {language === "en" ? "Queue Number" : "Numero ng Pila"}
                </h2>
                <p className="text-xs sm:text-sm opacity-75">
                    {language === "en"
                        ? "Please input your queue number."
                        : "Pakilagay ang iyong numero ng pila."}
                </p>
            </div>

            <div className="space-y-3">
                <label className="text-sm sm:text-base">
                    {language === "en" ? "Queue Number" : "Numero ng Pila"}{" "}
                    <span className="text-xs opacity-70">
                        {language === "en"
                            ? "Enter the queue number that was given to you."
                            : "Ilagay ang numerong ibinigay sa iyo."}
                    </span>
                </label>
                <input
                    type="text"
                    value={queueNumber}
                    onChange={(e) => setQueueNumber(e.target.value)}
                    placeholder={
                        language === "en"
                            ? "e.g., ABC1-234"
                            : "Halimbawa: ABC1-234"
                    }
                    disabled={loading}
                    className={`w-full px-2 sm:px-3 py-1 sm:py-2 rounded border text-sm sm:text-base transition-colors duration-300 ${hasError ? 'border-red-500' : ''}`}
                    style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                    }}
                />
            </div>

            {hasError && (
                <div className="flex items-start gap-2 p-3 rounded-md border border-red-500 bg-red-50">
                    <p className="text-xs sm:text-sm font-medium text-red-500">
                        {hasError}
                    </p>
                </div>
            )}

            <div className="flex gap-2 sm:gap-3 justify-between mt-3 sm:mt-4">
                <button
                    onClick={handleSubmit}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded text-sm sm:text-base font-medium transition-colors duration-300"
                    disabled={loading || !queueNumber.trim()}
                    style={{
                        backgroundColor: "var(--text-color)",
                        color: "var(--bg-color)",
                        opacity: loading || !queueNumber.trim() ? 0.6 : 1,
                        cursor: loading || !queueNumber.trim() ? "not-allowed" : "pointer",
                    }}
                >
                    {loading
                        ? language === "en"
                            ? "Verifying..."
                            : "Biniberopeka..."
                        : language === "en"
                        ? "Verify Queue Number"
                        : "Beripikahin ang Numero ng Pila"}
                </button>
            </div>
        </div>
    );
};

export default VerifyQueueForm;
