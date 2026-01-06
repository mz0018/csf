import { useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api"; // use centralized Axios instance

const useFormSubmission = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherServiceText, setOtherServiceText] = useState("");
  const [demographics, setDemographics] = useState({});
  const [addressDetails, setAddressDetails] = useState({});
  const [serviceRatings, setServiceRatings] = useState({});
  const [respondent, setRespondent] = useState({ clientName: "", clientPhone: "" });
  const [otherSuggestions, setOtherSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({});

  const updateOffice = (office) => {
    setSelectedOffice(office);
  };

  const updateServices = (services, otherText = "") => {
    setSelectedServices(services);
    setOtherServiceText(otherText);
  };

  const updateDemographics = (demographicsData) => {
    setDemographics(demographicsData.selectedOptions || {});
    setAddressDetails(demographicsData.addressInputs || {});
  };

  const updateRespondent = (respondentData = {}) => {
    setRespondent((prev) => ({ ...prev, ...respondentData }));
  };

  const updateRatings = (ratings) => {
    setServiceRatings(ratings);
  };

  const updateOtherSuggestions = (text) => {
    setOtherSuggestions(text);
  };

  const resetForm = () => {
    setSelectedOffice(null);
    setSelectedServices([]);
    setOtherServiceText("");
    setDemographics({});
    setAddressDetails({});
    setServiceRatings({});
    setRespondent({ clientName: "", clientPhone: "" });
    setOtherSuggestions("");
    setHasError({});
    setIsLoading(false);
  };

  const getCompleteFormData = () => {
    return {
      selectedOffice,
      services: {
        selected: selectedServices.map((service) => ({
          id: service.id,
          name: service.name,
        })),
        otherText: otherServiceText,
      },
      demographics: {
        affiliations: demographics[1] || [],
        genders: demographics[2] || [],
        ageGroups: demographics[3] || [],
        addresses: {
          selected: demographics[4] || [],
          details: addressDetails,
        },
        employmentStatus: demographics[5] || [],
      },
      ratings: serviceRatings,
      respondent,
      otherSuggestions,
      submittedAt: new Date().toISOString(),
    };
  };

  const submitForm = async (ratingsFromComponent, otherSuggestionsParam = null) => {
    setIsLoading(true);

    const base = getCompleteFormData();
    const formData = {
      ...base,
      ratings: ratingsFromComponent,
      otherSuggestions: otherSuggestionsParam !== null
        ? otherSuggestionsParam
        : base.otherSuggestions,
    };

    try {
      const response = await api.post("/client/submit", formData);

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${response.data.message}`,
        confirmButtonText: "OK",
      });

      return { success: true };

    } catch (error) {
      setHasError(error);

      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data?.message || "An error occurred while submitting the form."}`,
        footer: '<a id="why-issue" href="#">Why do I have this issue?</a>'
      });

      setTimeout(() => {
        const link = document.getElementById("why-issue");
        if (link) {
          link.addEventListener("click", () => {
            Swal.fire({
              icon: "info",
              title: "Possible Causes",
              html: `
                <ul style="text-align:left;">
                  <li>Server is down</li>
                  <li>API URL is incorrect</li>
                  <li>Missing or invalid data</li>
                  <li>Backend validation failed</li>
                </ul>
              `
            });
          });
        }
      }, 50);

      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getFormState = () => ({
    selectedOffice,
    selectedServices,
    otherServiceText,
    demographics,
    addressDetails,
    respondent,
    serviceRatings,
    otherSuggestions,
  });

  return {
    selectedOffice,
    selectedServices,
    otherServiceText,
    demographics,
    addressDetails,
    serviceRatings,
    otherSuggestions,
    updateOffice,
    updateServices,
    updateDemographics,
    updateRatings,
    updateRespondent,
    updateOtherSuggestions,
    submitForm,
    resetForm,
    getCompleteFormData,
    getFormState,
    respondent,
    isLoading,
    hasError,
  };
};

export default useFormSubmission;
