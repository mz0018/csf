export const ratingOptions = [
  { icon: "😄", label: { en: "Very Satisfactory", tl: "Napakabuti" }, value: 5.0 },
  { icon: "🙂", label: { en: "Satisfactory", tl: "Katanggap-tanggap" }, value: 4.0 },
  { icon: "😐", label: { en: "Neutral", tl: "Neutral" }, value: 3.0 },
  { icon: "🙁", label: { en: "Unsatisfactory", tl: "Hindi Katanggap-tanggap" }, value: 2.0 },
  { icon: "😡", label: { en: "Very Unsatisfactory", tl: "Napakasama" }, value: 1.0 }
];

export const serviceRatings = [
  { 
    id: 1,
    name: { en: "Responsiveness", tl: "Pagkasagot" },
    description: { en: "The service was willingly and promptly extended to the client/customer.", tl: "Ang serbisyo ay agad at malugod na ibinigay sa kliyente." },
    options: ratingOptions
  },
  { 
    id: 2,
    name: { en: "Reliability", tl: "Pagiging Maaasahan" },
    description: { en: "Performed the service within the expectation of the client/customer served.", tl: "Ang serbisyo ay isinagawa ayon sa inaasahan ng kliyente." },
    options: ratingOptions
  },
  { 
    id: 3,
    name: { en: "Access & Facilities", tl: "Access & Pasilidad" },
    description: { en: "Facilities/resources/modes of technology were readily available for convenient transactions.", tl: "Ang mga pasilidad/mga resources/mga teknolohiya ay madaling magamit para sa maginhawang transaksyon." },
    options: ratingOptions
  },
  { 
    id: 4,
    name: { en: "Communication", tl: "Komunikasyon" },
    description: { en: "Materials associated with the service are easily understood and feedback mechanisms are present.", tl: "Ang mga materyales na kaugnay ng serbisyo ay madaling maintindihan at mayroong feedback mechanisms." },
    options: ratingOptions
  },
  { 
    id: 5,
    name: { en: "Costs", tl: "Mga Gastos" },
    description: { en: "Value for money spent on services rendered.", tl: "Halaga ng pera na ginastos para sa mga serbisyo." },
    options: ratingOptions
  },
  { 
    id: 6,
    name: { en: "Integrity", tl: "Integridad" },
    description: { en: "Provided services with high morale and spirit of honesty.", tl: "Ang mga serbisyo ay ibinigay nang may mataas na moral at espiritu ng katapatan." },
    options: ratingOptions
  },
  { 
    id: 7,
    name: { en: "Assurance", tl: "Assurance" },
    description: { en: "The service was provided by competent personnel.", tl: "Ang serbisyo ay ibinigay ng mga kwalipikadong tao." },
    options: ratingOptions
  },
  { 
    id: 8,
    name: { en: "Outcome", tl: "Resulta" },
    description: { en: "The overall expectations of the client are met.", tl: "Natugunan ang pangkalahatang inaasahan ng kliyente." },
    options: ratingOptions
  }
];
