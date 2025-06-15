
import { useTranslation } from "@/hooks/useTranslation";

const ContactInfo = () => {
  const { t, lang } = useTranslation();
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("contact.getInTouch")}</h2>
      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t("contact.phone")}</h3>
            <p className="text-gray-600">+91 </p>
            <p
              className="text-gray-600"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {t("contact.phoneAvailable")}
            </p>
          </div>
        </div>
        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t("contact.email")}</h3>
            <p className="text-gray-600">info@satyakarma.org</p>
            <p className="text-gray-600">volunteer@satyakarma.org</p>
          </div>
        </div>
        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t("contact.address")}</h3>
            <p
              className="text-gray-600"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {t("contact.addressLine1")}<br />
              {t("contact.addressLine2")}<br />
              {t("contact.addressLine3")}<br />
              {t("contact.country")}
            </p>
          </div>
        </div>
        {/* Social media */}
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t("contact.socialMedia")}</h3>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="text-green-600 hover:text-green-700">Facebook</a>
              <a href="#" className="text-green-600 hover:text-green-700">Twitter</a>
              <a href="#" className="text-green-600 hover:text-green-700">Instagram</a>
              <a href="#" className="text-green-600 hover:text-green-700">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
