import { ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const BtnNext = ({ onClick, disabled = false }) => {
  const { language } = useLanguage();
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition duration-200 shadow-sm";
  const enabledStyle = {
    backgroundColor: "var(--text-color)",
    color: "var(--bg-color)",
  };
  const disabledStyle = {
    backgroundColor: "rgba(128,128,128,0.35)",
    color: "rgba(255,255,255,0.8)",
    cursor: "not-allowed",
    opacity: 0.85,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={base}
      style={disabled ? disabledStyle : enabledStyle}
      aria-disabled={disabled}
    >
      <span>{language === "en" ? "Next" : "Susunod"}</span>
      <ChevronRight size={18} />
    </button>
  );
};

export default BtnNext;
