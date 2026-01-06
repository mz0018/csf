import React, { Suspense, lazy, useState } from "react";
import FormLoader from "../fallbacks/FormLoader";
import useFormSubmission from "../hooks/useFormSubmission";

const Reminder = lazy(() => import("./Reminder"));
const SelectOffice = lazy(() => import("../forms/SelectOffice"));
const TypesOfServices = lazy(() => import("../forms/TypesOfServices"));
const DemographicForm = lazy(() => import("../forms/DemographicForm"));
const RespondentProfile = lazy(() => import("../forms/RespondentProfile"));
const ServiceRatingForm = lazy(() => import("../forms/ServiceRatingForm"));
const OtherSuggestions = lazy(() => import("../forms/OtherSuggestions")); // NEW

const Main = () => {
  const formHook = useFormSubmission();

  const [showRespondent, setShowRespondent] = useState(false);
  const [showDemographic, setShowDemographic] = useState(false);
  const [showServiceRating, setShowServiceRating] = useState(false);
  const [showOtherSuggestions, setShowOtherSuggestions] = useState(false); // NEW

  const [showReminder, setShowReminder] = useState(true);

  const dismissReminder = () => {
    setShowReminder(false);
  };

  // SELECT OFFICE -> RESPONDENT PROFILE
  const handleSelectOffice = (office) => {
    formHook.updateOffice(office);
    setShowRespondent(true);
  };

  // RESPONDENT -> TYPES OF SERVICES
  const handleRespondentNext = (respondentData) => {
    if (respondentData) formHook.updateRespondent(respondentData);
    setShowRespondent(false);
  };

  const handleBackFromRespondent = () => {
    setShowRespondent(false);
    // formHook.updateOffice(null);
  };

  // TYPES OF SERVICES -> DEMOGRAPHIC
  const handleGoToDemographic = (serviceData) => {
    formHook.updateServices(serviceData.services, serviceData.otherServiceText);
    setShowDemographic(true);
  };

  // DEMOGRAPHIC -> SERVICE RATING
  const handleGoToServiceRating = (demData) => {
    formHook.updateDemographics(demData);
    setShowDemographic(false);
    setShowServiceRating(true);
  };

  const handleBackFromServiceRating = () => {
    setShowServiceRating(false);
    setShowDemographic(true);
  };

  const handleSubmitServiceRating = (completeData) => {
    formHook.updateRatings(completeData.serviceRatings);
    setShowServiceRating(false);
    setShowOtherSuggestions(true);
  };

  const handleBackFromOtherSuggestions = () => {
    setShowOtherSuggestions(false);
    setShowServiceRating(true);
  };

  const resetFlow = () => {
    setShowReminder(true);
    setShowRespondent(false);
    setShowDemographic(false);
    setShowServiceRating(false);
    setShowOtherSuggestions(false);

    formHook.resetForm();
  };

  const handleSkipSuggestionsAndSubmit = async () => {
    const result = await formHook.submitForm(formHook.serviceRatings, null);
    
    if (result?.success) {
      setShowOtherSuggestions(false);
      resetFlow();
    }
  };

  const handleSaveSuggestionsAndSubmit = async (text) => {
    const result = await formHook.submitForm(formHook.serviceRatings, text);
    
    if (result?.success) {
      setShowOtherSuggestions(false);
      resetFlow();
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center min-h-screen relative bg-neutral-primary bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/img/munisipyo.jpg")' }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: "var(--overlay-color, rgba(0, 0, 0, 0.8))" }}
      ></div>

      <div className="relative z-10 space-y-4">

        {showReminder && (
          <Suspense fallback={<FormLoader />}>
            <Reminder onDismiss={dismissReminder} />
          </Suspense>
        )}

        {!showReminder && (
          <>
            {/* SELECT OFFICE */}
            {!formHook.selectedOffice && !showRespondent && (
              <Suspense fallback={<FormLoader />}>
                <SelectOffice setSelectedOffice={handleSelectOffice} />
              </Suspense>
            )}

            {/* RESPONDENT PROFILE */}
            {showRespondent && (
              <Suspense fallback={<FormLoader />}>
                <RespondentProfile
                  onBack={handleBackFromRespondent}
                  onNext={handleRespondentNext}
                />
              </Suspense>
            )}

            {/* TYPES OF SERVICES */}
            {formHook.selectedOffice && !showRespondent && !showDemographic && !showServiceRating && !showOtherSuggestions && (
              <Suspense fallback={<FormLoader />}>
                <TypesOfServices
                  selectedOffice={formHook.selectedOffice}
                  onBack={() => {
                    setShowRespondent(true);
                  }}
                  onNext={handleGoToDemographic}
                />
              </Suspense>
            )}

            {/* DEMOGRAPHIC FORM */}
            {showDemographic && !showServiceRating && !showOtherSuggestions && (
              <Suspense fallback={<FormLoader />}>
                <DemographicForm
                  onBack={() => {
                    setShowDemographic(false);
                    // formHook.updateOffice(null);
                  }}
                  onNext={handleGoToServiceRating}
                  selectedOffice={formHook.selectedOffice}
                  selectedServices={formHook.selectedServices}
                  otherServiceText={formHook.otherServiceText}
                />
              </Suspense>
            )}

            {/* SERVICE RATING */}
            {showServiceRating && !showOtherSuggestions && (
              <Suspense fallback={<FormLoader />}>
                <ServiceRatingForm
                  onBack={handleBackFromServiceRating}
                  onSubmit={handleSubmitServiceRating}
                  selectedOffice={formHook.selectedOffice}
                  selectedServices={formHook.selectedServices}
                  otherServiceText={formHook.otherServiceText}
                  demographics={formHook.demographics}
                  addressDetails={formHook.addressDetails}
                />
              </Suspense>
            )}

            {/* OTHER SUGGESTIONS (optional) */}
            {showOtherSuggestions && (
              <Suspense fallback={<FormLoader />}>
                <OtherSuggestions
                  onBack={handleBackFromOtherSuggestions}
                  onSkip={handleSkipSuggestionsAndSubmit}
                  onSave={handleSaveSuggestionsAndSubmit}
                  defaultText={formHook.otherSuggestions}
                />
              </Suspense>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Main;
