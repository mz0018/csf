import { useState, lazy } from "react";
import { demographic } from "../mocks/DemoGraphic"; // Import updated data
import { barangays } from "../mocks/Barangay";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; // Import Language Context

const BtnGoBack = lazy(() => import("../buttons/BtnGoBack"));
const BtnNext = lazy(() => import("../buttons/BtnNext"));

const DemographicForm = ({ onBack, onNext, selectedOffice, selectedServices, otherServiceText }) => {
  const { language } = useLanguage(); // Get current language
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addressInputs, setAddressInputs] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  const currentCategory = demographic[currentStep];
  const isLastStep = currentStep === demographic.length - 1;
  const isAddressStep = currentCategory.id === 4;

  const handleCheckboxChange = (option) => {
    const prevCategory = selectedOptions[currentCategory.id] || [];
    const isSelected = prevCategory.includes(option);

    setSelectedOptions((prev) => ({
      ...prev,
      [currentCategory.id]: isSelected ? [] : [option],
    }));

    setAddressInputs((prev) => {
      const next = { ...prev };
      const newSelected = isSelected ? [] : [option];
      currentCategory.options.forEach((opt) => {
        if (!newSelected.includes(opt) && next.hasOwnProperty(opt)) {
          delete next[opt];
        }
      });
      return next;
    });
  };

  const handleAddressInputChange = (option, value) => {
    setAddressInputs((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      const demographicsData = { selectedOptions, addressInputs };
      onNext(demographicsData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) onBack();
    else setCurrentStep((prev) => prev - 1);
  };

  const currentSelections = selectedOptions[currentCategory.id] || [];
  const hasSelection = currentSelections.length > 0;
  let allAddressFilled = true;
  if (isAddressStep && hasSelection) {
    allAddressFilled = currentSelections.every(
      (opt) => (addressInputs[opt] || "").trim().length > 0
    );
  }
  const isNextDisabled = !hasSelection || (isAddressStep && !allAddressFilled);

  const getWithinLabel = () => {
    return language === "en" ? "Within" : "Sa loob ng";
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
        <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--heading-color)" }}>
          {currentCategory.name[language]}
        </h2>
        <p className="text-xs sm:text-sm opacity-75">
          {language === "en" ? `Step ${currentStep + 1} of ${demographic.length}` : `Hakbang ${currentStep + 1} ng ${demographic.length}`}
        </p>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">{currentCategory.name[language]}</h3>
        <ul className="space-y-2 sm:space-y-3">
          {currentCategory.options.map((option) => (
            <li key={`${currentCategory.id}-${option[language]}`}>
              <label className="relative flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedOptions[currentCategory.id]?.includes(option[language]) || false}
                  onChange={() => handleCheckboxChange(option[language])}
                  className="peer absolute w-4 h-4 sm:w-5 sm:h-5 opacity-0 cursor-pointer"
                />
                <span
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-400 dark:border-gray-300
                    flex items-center justify-center transition-colors duration-300
                    peer-checked:bg-[#0052ff] peer-checked:border-[#0052ff]"
                >
                  {selectedOptions[currentCategory.id]?.includes(option[language]) && (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </span>
                <span className="ml-2 sm:ml-3 text-sm sm:text-base" style={{ color: "var(--text-color)" }}>
                  {option[language]}
                </span>
              </label>

              {isAddressStep && selectedOptions[currentCategory.id]?.includes(option[language]) && (
                <div className="mt-2 sm:mt-3 ml-6 sm:ml-8">
                  {option[language].includes(getWithinLabel()) ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(option[language])}
                        className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded border text-sm sm:text-base transition-colors duration-300 flex items-center justify-between"
                        style={{
                          backgroundColor: "var(--bg-color)",
                          borderColor: "rgba(128,128,128,0.3)",
                          color: "var(--text-color)",
                        }}
                      >
                        <span>{addressInputs[option[language]] || (language === "en" ? "Select barangay..." : "Pumili ng barangay")}</span>
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-200"
                          style={{
                            transform: openDropdowns[option[language]] ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </button>

                      {openDropdowns[option[language]] && (
                        <div
                          className="absolute top-full left-0 right-0 mt-1 rounded border shadow-lg z-10 max-h-48 overflow-y-auto"
                          style={{
                            backgroundColor: "var(--bg-color)",
                            borderColor: "rgba(128,128,128,0.3)",
                            color: "var(--text-color)",
                          }}
                        >
                          {barangays.map((b) => (
                            <button
                              key={b.title}
                              type="button"
                              onClick={() => {
                                handleAddressInputChange(option[language], b.title);
                                toggleDropdown(option[language]);
                              }}
                              className="w-full text-left px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base hover:opacity-75 transition-opacity duration-150"
                              style={{
                                backgroundColor: addressInputs[option[language]] === b.title ? "rgba(0, 82, 255, 0.15)" : "transparent",
                              }}
                            >
                              {b.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={addressInputs[option[language]] || ""}
                      onChange={(e) => handleAddressInputChange(option[language], e.target.value)}
                      placeholder={language === "en" ? "Enter municipality name..." : "Ilagay ang pangalan ng munisipyo..."}
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 rounded border text-sm sm:text-base transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--bg-color)",
                        borderColor: "rgba(128,128,128,0.3)",
                        color: "var(--text-color)",
                      }}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 sm:gap-3 justify-between mt-3 sm:mt-4">
        <BtnGoBack onClick={handleBack} />
        <BtnNext onClick={handleNext} disabled={isNextDisabled} />
      </div>
    </div>
  );
};

export default DemographicForm;
