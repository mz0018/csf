import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const BtnGoBack = ({ onClick }) => {
  const { language } = useLanguage();
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm";
  const styleObj = {
    backgroundColor: "transparent",
    color: "var(--text-color)",
    border: "1px solid rgba(128,128,128,0.18)",
  };

  return (
    <button
      onClick={onClick}
      className={base}
      style={styleObj}
    >
      <ChevronLeft size={18} />
      <span>{language === "en" ? "Back" : "Bumalik"}</span>
    </button>
  );
};

export default BtnGoBack;
