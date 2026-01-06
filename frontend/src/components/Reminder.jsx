import React from "react";
import { useLanguage } from "../context/LanguageContext";
import BtnLanguageToggle from "../buttons/BtnLanguageToggle";

const Reminder = ({ onDismiss }) => {
  const { language } = useLanguage();

  const englishContent = `
    Thank you for choosing the Local Government Unit (LGU) of Solano for your service needs. 
    This <a class="font-semibold">Client Satisfaction Measurement (CSM)</a> tracks the customer experience of government offices. 
    Your feedback on your <a class="font-semibold">recently concluded transaction</a> will help this office provide a better service. 
    Rest assured, all information provided in this survey will be treated with the utmost confidentiality 
    in accordance with the Data Privacy Act of 2012.
  `;

  const tagalogContent = `
    Maraming salamat sa pagpili ng Lokal na Pamahalaan ng Solano (LGU) para sa iyong mga pangangailangan sa serbisyo. 
    Ang <a class="font-semibold">Pagsusukat ng Kasiyahan ng Kliyente (CSM)</a> ay sumusubaybay sa karanasan ng mga customer sa mga tanggapan ng gobyerno. 
    Ang iyong puna tungkol sa iyong <a class="font-semibold">kamakailang natapos na transaksyon</a> ay makakatulong upang mapabuti ang serbisyo ng opisina na ito. 
    Tinitiyak namin na ang lahat ng impormasyon na ibibigay sa survey na ito ay ituturing na kumpidensyal alinsunod sa Batas sa Privacy ng Datos ng 2012.
  `;

  return (
    <div
      className="p-6 sm:p-8 rounded-xl shadow-xl w-full sm:w-[450px] md:w-[550px] lg:w-[600px] transition-all duration-300 bg-[var(--bg-color)] text-[var(--text-color)]"
    >
      <div className="prose prose-sm sm:prose-base lg:prose-lg text-justify space-y-6">
        {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {language === "en" ? "Reminder" : "Paalala"}
        </h2> */}

        <p className="text-sm sm:text-base md:text-lg">
          Dear Valued Client,
        </p>

        <p
          dangerouslySetInnerHTML={{
            __html: language === "en" ? englishContent : tagalogContent,
          }}
          className="text-sm sm:text-base md:text-lg"
        />

        <p className="text-sm sm:text-base md:text-lg">
          {language === "en"
            ? "Your participation is voluntary, and your responses will only be used for the purpose of service improvement. We assure you that your privacy is a priority for us."
            : "Ang iyong partisipasyon ay kusang-loob, at ang iyong mga sagot ay gagamitin lamang para sa layunin ng pagpapabuti ng serbisyo. Tinitiyak namin sa iyo na ang iyong privacy ay aming prayoridad."
          }
        </p>

        <p className="text-sm sm:text-base md:text-lg">
          {language === "en"
            ? "Thank you for helping us create a more responsive and client-oriented LGU Solano."
            : "Maraming salamat sa pagtulong upang lumikha ng isang mas tumutugon at nakatuon sa kliyente na LGU Solano."
          }
        </p>

        <div className="mt-6 flex justify-between items-center gap-2">
          <BtnLanguageToggle />

          <button
            onClick={onDismiss}
            className="w-full inline-flex justify-center items-center text-center gap-2 px-4 py-2 rounded-lg transition duration-200 shadow-sm text-[var(--bg-color)] bg-[var(--text-color)] hover:brightness-90 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            {language === "en" ? "Got it" : "Naiintindihan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
