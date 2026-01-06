import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FaGlobe } from "react-icons/fa"; 

const BtnLanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="w-full px-4 py-2 bg-[#628dec] text-white rounded-lg text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
            <FaGlobe />
            Translate to {language === "en" ? "Tagalog" : "English"}
        </button>
    );
};

export default BtnLanguageToggle;
